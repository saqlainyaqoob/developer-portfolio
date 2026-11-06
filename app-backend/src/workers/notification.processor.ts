import {
  claimFailedNotificationById,
  claimNotificationById,
  markManualNotificationFailed,
  markNotificationSent,
  type PendingContactNotification,
} from "../services/contact.service.js";

import { sendContactNotification } from "../services/email.service.js";

  export type NotificationResult =
    | "sent"
    | "failed"
    | "retry_failed"
    | "skipped"
    | "sent_status_update_failed";

async function sendClaimedNotification(
  notification: PendingContactNotification,
): Promise<"sent" | "sent_status_update_failed"> {
  console.info(
    `[Notification Processor] Processing ${notification.id} ` +
      `(attempt ${notification.notification_attempts}).`,
  );

  await sendContactNotification({
    name: notification.name,
    email: notification.email,
    message: notification.message,
  });

  try {
    await markNotificationSent(notification.id);

    console.info(
      `[Notification Processor] Notification ${notification.id} sent successfully.`,
    );

    return "sent";
  } catch (error) {
    // SMTP succeeded. Do not send the same email again automatically.
    console.error(
      `[Notification Processor] Email was sent, but its database status could not be updated for ${notification.id}:`,
      error,
    );

    return "sent_status_update_failed";
  }
}

/**
 * Immediately attempts email delivery for a newly submitted contact message.
 */
export async function processNotificationById(
  id: string,
): Promise<NotificationResult> {
  const notification = await claimNotificationById(id);

  if (!notification) {
    console.info(
      `[Notification Processor] Notification ${id} was not eligible for processing.`,
    );

    return "skipped";
  }

  try {
    return await sendClaimedNotification(notification);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown email delivery error.";

    console.error(
      `[Notification Processor] Email delivery failed for ${id}:`,
      errorMessage,
    );

    try {
      await markManualNotificationFailed(id, errorMessage);
    } catch (statusError) {
      console.error(
        `[Notification Processor] Could not mark notification ${id} as failed:`,
        statusError,
      );

      throw statusError;
    }

    return "failed";
  }
}

/**
 * Manually retries one explicitly selected failed notification.
 *
 * Only failed, eligible notifications can be claimed.
 */
export async function retryFailedNotificationById(
  id: string,
): Promise<NotificationResult> {
  const notification = await claimFailedNotificationById(id);

  if (!notification) {
    console.info(
      `[Notification Processor] Notification ${id} is not eligible for manual retry.`,
    );

    return "skipped";
  }

  try {
    return await sendClaimedNotification(notification);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown email delivery error.";

    console.error(
      `[Notification Processor] Manual email retry failed for ${id}:`,
      errorMessage,
    );

    try {
      await markManualNotificationFailed(id, errorMessage);
    } catch (statusError) {
      console.error(
        `[Notification Processor] Could not restore failed status for ${id}:`,
        statusError,
      );

      throw statusError;
    }

    return "retry_failed";
  }
}
