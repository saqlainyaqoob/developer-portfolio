import {
  verifyEmailConnection,
  sendTestEmail,
} from "../services/email.service.js";

async function testEmail(): Promise<void> {
  try {
    console.log("Checking Gmail SMTP connection...");

    await verifyEmailConnection();

    console.log("Sending test email...");

    await sendTestEmail();

    console.log("Email test completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Email test failed.");

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
}

void testEmail();
