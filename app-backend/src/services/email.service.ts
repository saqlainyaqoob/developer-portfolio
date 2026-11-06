
import nodemailer from "nodemailer";
import { env } from "../config/env.js";

function createEmailTransporter() {
  if (
    !env.SMTP_HOST ||
    !env.SMTP_PORT ||
    !env.SMTP_USER ||
    !env.SMTP_PASSWORD
  ) {
    throw new Error(
      "SMTP configuration is incomplete. Check your backend .env file.",
    );
  }

  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  });
}

export async function verifyEmailConnection(): Promise<void> {
  const transporter = createEmailTransporter();

  await transporter.verify();

  console.log("Gmail SMTP connection verified successfully.");
}

export async function sendTestEmail(): Promise<void> {
  if (!env.EMAIL_FROM || !env.CONTACT_RECEIVER_EMAIL) {
    throw new Error(
      "EMAIL_FROM or CONTACT_RECEIVER_EMAIL is missing from .env.",
    );
  }

  const transporter = createEmailTransporter();

  const result = await transporter.sendMail({
    from: `"Portfolio Contact API" <${env.EMAIL_FROM}>`,
    to: env.CONTACT_RECEIVER_EMAIL,
    subject: "Portfolio Backend - Test Email",
    text: `
Hello!

This is a test email from your React Native Portfolio Backend.

Your Gmail SMTP configuration is working successfully.

Technology:
- Node.js
- Express
- TypeScript
- Nodemailer
- Gmail SMTP

Your contact form email notification system is ready for integration.

Best regards,
Portfolio Contact API
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Portfolio Backend - Test Email</h2>
        <p>Hello!</p>
        <p>
          This is a test email from your React Native Portfolio Backend.
        </p>
        <p>
          Your Gmail SMTP configuration is working successfully.
        </p>
        <h3>Technology Stack</h3>
        <ul>
          <li>Node.js</li>
          <li>Express</li>
          <li>TypeScript</li>
          <li>Nodemailer</li>
          <li>Gmail SMTP</li>
        </ul>
        <p>Your contact form email notification system is ready for integration.</p>
        <p>Best regards,<br />Portfolio Contact API</p>
      </div>
    `,
  });

  console.log("Test email sent successfully.");
  console.log(`Message ID: ${result.messageId}`);
}



interface ContactNotification {
  name: string;
  email: string;
  message: string;
}

export async function sendContactNotification(
  contact: ContactNotification,
): Promise<void> {
  if (!env.EMAIL_FROM || !env.CONTACT_RECEIVER_EMAIL) {
    throw new Error("Email configuration is incomplete.");
  }

  const transporter = createEmailTransporter();

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${env.EMAIL_FROM}>`,
    to: env.CONTACT_RECEIVER_EMAIL,
    replyTo: contact.email,
    subject: `New portfolio message from ${contact.name}`,
    text: `
You have received a new message through your portfolio contact form.

Name: ${contact.name}
Email: ${contact.email}

Message:
${contact.message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>New Portfolio Contact Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
        <h3>Message</h3>
        <p style="white-space: pre-wrap;">${escapeHtml(contact.message)}</p>
      </div>
    `,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
