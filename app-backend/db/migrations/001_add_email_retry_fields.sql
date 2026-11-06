BEGIN;

ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS notification_attempts
    INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS notification_next_attempt_at
    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS notification_locked_until
    TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS notification_last_attempt_at
    TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_contact_messages_pending_notifications
  ON public.contact_messages (
    notification_next_attempt_at,
    created_at
  )
  WHERE notification_status = 'pending';

COMMIT;
