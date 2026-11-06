import type { Request, Response } from "express";

import { contactSchema } from "../validators/contact.validator.js";
import { createContactMessage } from "../services/contact.service.js";
import { processNotificationById } from "../workers/notification.processor.js";

export async function submitContactMessage(
  req: Request,
  res: Response,
): Promise<void> {
  // 1. Validate the submitted contact form.
  const validation = contactSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      success: false,
      message: "Please check your submitted information.",
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  // 2. Save the contact message first.
  let savedMessage;

  try {
    savedMessage = await createContactMessage(validation.data);
  } catch (error) {
    console.error(
      "Failed to save contact message:",
      error instanceof Error ? error.message : "Unknown error",
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to submit your message right now. Please try again later.",
    });
    return;
  }

  // 3. Attempt the email notification immediately.
  // The contact message remains saved even if email delivery fails.
  try {
    const result = await processNotificationById(savedMessage.id);

    console.info(
      `[Contact Controller] Notification result for ${savedMessage.id}: ${result}`,
    );
  } catch (error) {
    console.error(
      `[Contact Controller] Notification processing failed for ${savedMessage.id}:`,
      error instanceof Error ? error.message : "Unknown error",
    );
  }

  // 4. Return success because the contact message was saved.
  res.status(201).json({
    success: true,
    message: "Your message has been submitted successfully.",
    data: {
      id: savedMessage.id,
      createdAt: savedMessage.created_at,
    },
  });
}
