BEGIN;

CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  message TEXT NOT NULL,

  notification_status VARCHAR(20) NOT NULL DEFAULT 'pending',
  notification_error TEXT,
  notified_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT contact_name_length
    CHECK (char_length(name) >= 2 AND char_length(name) <= 100),

  CONSTRAINT contact_email_length
    CHECK (char_length(email) >= 3 AND char_length(email) <= 254),

  CONSTRAINT contact_message_length
    CHECK (char_length(message) >= 10 AND char_length(message) <= 5000),

  CONSTRAINT contact_messages_notification_status_check
    CHECK (notification_status IN ('pending', 'sent', 'failed'))
);

CREATE INDEX idx_contact_messages_created_at
  ON public.contact_messages (created_at DESC);

COMMIT;
