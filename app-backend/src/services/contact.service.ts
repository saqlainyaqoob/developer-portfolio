import { pool } from "../config/database.js";
import type { ContactInput } from "../validators/contact.validator.js";

export const MAX_NOTIFICATION_ATTEMPTS = 5;

export interface CreatedContactMessage {
  id: string;
  created_at: Date;
}

export interface PendingContactNotification {
  id: string;
  name: string;
  email: string;
  message: string;
  notification_attempts: number;
}

export async function createContactMessage(
  contact: ContactInput,
): Promise<CreatedContactMessage> {
  const query = `
    INSERT INTO contact_messages (
      name,
      email,
      message,
      notification_worker_eligible
    )
    VALUES ($1, $2, $3, TRUE)
    RETURNING id, created_at;
  `;

  const result = await pool.query<CreatedContactMessage>(query, [
    contact.name,
    contact.email,
    contact.message,
  ]);

  const savedMessage = result.rows[0];

  if (!savedMessage) {
    throw new Error("Failed to save contact message.");
  }

  return savedMessage;
}

/**
 * Atomically claims one specific eligible notification.
 *
 * Used for the immediate email attempt after a new contact submission.
 * Ineligible, locked, or not-yet-due notifications are never claimed.
 */
export async function claimNotificationById(
  id: string,
): Promise<PendingContactNotification | null> {
  const query = `
    WITH candidate AS (
      SELECT id
      FROM public.contact_messages
      WHERE id = $1
        AND notification_status = 'pending'
        AND notification_worker_eligible = TRUE
        AND notification_attempts < $2
        AND notification_next_attempt_at <= NOW()
        AND (
          notification_locked_until IS NULL
          OR notification_locked_until <= NOW()
        )
      FOR UPDATE SKIP LOCKED
      LIMIT 1
    )
    UPDATE public.contact_messages AS message
    SET
      notification_locked_until = NOW() + INTERVAL '2 minutes',
      notification_attempts = message.notification_attempts + 1,
      notification_last_attempt_at = NOW()
    FROM candidate
    WHERE message.id = candidate.id
    RETURNING
      message.id,
      message.name,
      message.email,
      message.message,
      message.notification_attempts;
  `;

  const result = await pool.query<PendingContactNotification>(query, [
    id,
    MAX_NOTIFICATION_ATTEMPTS,
  ]);

  return result.rows[0] ?? null;
}

/**
 * Claims a failed notification for an explicitly requested manual retry.
 *
 * Only eligible failed notifications can be retried.
 * The database lock prevents concurrent retry attempts.
 */
export async function claimFailedNotificationById(
  id: string,
): Promise<PendingContactNotification | null> {
  const query = `
    WITH candidate AS (
      SELECT id
      FROM public.contact_messages
      WHERE id = $1
        AND notification_status = 'failed'
        AND notification_worker_eligible = TRUE
        AND (
          notification_locked_until IS NULL
          OR notification_locked_until <= NOW()
        )
      FOR UPDATE SKIP LOCKED
      LIMIT 1
    )
    UPDATE public.contact_messages AS message
    SET
      notification_status = 'pending',
      notification_attempts = 1,
      notification_next_attempt_at = NOW(),
      notification_last_attempt_at = NOW(),
      notification_locked_until = NOW() + INTERVAL '2 minutes',
      notification_error = NULL,
      notified_at = NULL
    FROM candidate
    WHERE message.id = candidate.id
    RETURNING
      message.id,
      message.name,
      message.email,
      message.message,
      message.notification_attempts;
  `;

  const result = await pool.query<PendingContactNotification>(query, [id]);

  return result.rows[0] ?? null;
}

/**
 * Mark a manually retried notification as failed if email delivery fails.
 */
export async function markManualNotificationFailed(
  id: string,
  errorMessage: string,
): Promise<void> {
  const result = await pool.query(
    `
      UPDATE public.contact_messages
      SET
        notification_status = 'failed',
        notification_error = $2,
        notification_locked_until = NULL,
        notified_at = NULL
      WHERE id = $1
        AND notification_status = 'pending';
    `,
    [id, errorMessage.slice(0, 2000)],
  );

  if (result.rowCount !== 1) {
    throw new Error("Could not mark manual notification retry as failed.");
  }
}

/**
 * Mark a successfully delivered notification.
 */
export async function markNotificationSent(id: string): Promise<void> {
  const result = await pool.query(
    `
      UPDATE public.contact_messages
      SET
        notification_status = 'sent',
        notification_error = NULL,
        notified_at = NOW(),
        notification_locked_until = NULL
      WHERE id = $1
        AND notification_status = 'pending';
    `,
    [id],
  );

  if (result.rowCount !== 1) {
    throw new Error("Could not mark contact notification as sent.");
  }
}
