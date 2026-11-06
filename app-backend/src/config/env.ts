// import "dotenv/config";
// import { z } from "zod";

// const envSchema = z.object({
//   NODE_ENV: z
//     .enum(["development", "production", "test"])
//     .default("development"),

//   PORT: z.coerce.number().int().positive().default(4000),

//   DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

//   CORS_ORIGIN: z.string().default("*"),

//   SMTP_HOST: z.string().optional(),
//   SMTP_PORT: z.coerce.number().positive().optional(),

//   SMTP_SECURE: z
//     .enum(["true", "false"])
//     .default("false")
//     .transform((value) => value === "true"),

//   SMTP_USER: z.string().optional(),
//   SMTP_PASSWORD: z.string().optional(),
//   EMAIL_FROM: z.string().optional(),
//   CONTACT_RECEIVER_EMAIL: z.string().optional(),
// });

// const parsedEnv = envSchema.safeParse(process.env);

// if (!parsedEnv.success) {
//   console.error("Invalid environment configuration:");
//   console.error(z.treeifyError(parsedEnv.error));
//   process.exit(1);
// }

// export const env = parsedEnv.data;

import "dotenv/config";
import { z } from "zod";

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),

    PORT: z.coerce.number().int().positive().max(65535).default(4000),

    DATABASE_URL: z.string().trim().min(1, "DATABASE_URL is required"),

    DB_POOL_MAX: z.coerce.number().int().min(1).max(50).default(10),

    DB_IDLE_TIMEOUT_MS: z.coerce
      .number()
      .int()
      .min(1000)
      .max(300000)
      .default(30000),

    DB_CONNECTION_TIMEOUT_MS: z.coerce
      .number()
      .int()
      .min(1000)
      .max(60000)
      .default(5000),

    CORS_ORIGIN: z.string().trim().default("*"),

    SMTP_HOST: z.string().trim().optional(),
    SMTP_PORT: z.coerce.number().int().positive().max(65535).optional(),

    SMTP_SECURE: z
      .enum(["true", "false"])
      .default("false")
      .transform((value) => value === "true"),

    SMTP_USER: z.string().trim().optional(),
    SMTP_PASSWORD: z.string().optional(),
    EMAIL_FROM: z.string().trim().optional(),
    CONTACT_RECEIVER_EMAIL: z.string().trim().optional(),
  })
  .superRefine((config, ctx) => {
    if (config.NODE_ENV !== "production") {
      return;
    }

    // Production must use explicitly configured frontend origins.
    if (!config.CORS_ORIGIN || config.CORS_ORIGIN === "*") {
      ctx.addIssue({
        code: "custom",
        path: ["CORS_ORIGIN"],
        message: "A specific frontend origin is required in production.",
      });
    } else {
      const origins = config.CORS_ORIGIN.split(",").map((origin) =>
        origin.trim(),
      );

      for (const origin of origins) {
        try {
          const parsed = new URL(origin);

          if (
            !["http:", "https:"].includes(parsed.protocol) ||
            parsed.origin !== origin
          ) {
            throw new Error("Invalid origin");
          }
        } catch {
          ctx.addIssue({
            code: "custom",
            path: ["CORS_ORIGIN"],
            message: `Invalid frontend origin: ${origin}`,
          });
        }
      }
    }

    // Production requires complete SMTP configuration.
    const requiredEmailSettings = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASSWORD",
      "EMAIL_FROM",
      "CONTACT_RECEIVER_EMAIL",
    ] as const;

    for (const key of requiredEmailSettings) {
      if (!config[key] || String(config[key]).trim() === "") {
        ctx.addIssue({
          code: "custom",
          path: [key],
          message: `${key} is required in production.`,
        });
      }
    }

    // Validate the configured email addresses.
    for (const key of ["EMAIL_FROM", "CONTACT_RECEIVER_EMAIL"] as const) {
      const value = config[key];

      if (value && !z.email().safeParse(value).success) {
        ctx.addIssue({
          code: "custom",
          path: [key],
          message: `${key} must contain a valid email address.`,
        });
      }
    }
  });

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment configuration:");
  console.error(z.treeifyError(parsedEnv.error));
  process.exit(1);
}

export const env = parsedEnv.data;
