BEGIN;

ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS notification_worker_eligible
    BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_contact_messages_worker_eligible
  ON public.contact_messages (
    notification_next_attempt_at,
    created_at
  )
  WHERE notification_status = 'pending'
    AND notification_worker_eligible = TRUE;

COMMIT;
