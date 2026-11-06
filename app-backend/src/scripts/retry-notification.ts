import { z } from "zod";
import { pool } from "../config/database.js";
import { retryFailedNotificationById } from "../workers/notification.processor.js";

const notificationIdSchema = z.uuid();

async function main(): Promise<void> {
  const notificationId = process.argv[2];

  if (!notificationId) {
    console.error("Usage: npm run notification:retry -- <NOTIFICATION_UUID>");
    process.exitCode = 1;
    return;
  }

  const validation = notificationIdSchema.safeParse(notificationId);

  if (!validation.success) {
    console.error("Invalid notification ID. Please provide a valid UUID.");
    process.exitCode = 1;
    return;
  }

  console.info(
    `[Manual Retry] Starting retry for notification ${notificationId}.`,
  );

  const result = await retryFailedNotificationById(notificationId);

  switch (result) {
    case "sent":
      console.info("[Manual Retry] Email sent successfully.");
      break;

    case "retry_failed":
      console.error(
        "[Manual Retry] Email delivery failed. Notification remains failed.",
      );
      process.exitCode = 1;
      break;

    case "skipped":
      console.warn(
        "[Manual Retry] Notification was not found or is not eligible for retry.",
      );
      process.exitCode = 1;
      break;

    case "sent_status_update_failed":
      console.error(
        "[Manual Retry] Email may have been sent, but the database status update failed. Check the database before attempting another retry.",
      );
      process.exitCode = 1;
      break;
  }
}

try {
  await main();
} catch (error) {
  console.error("[Manual Retry] An unexpected error occurred:", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
