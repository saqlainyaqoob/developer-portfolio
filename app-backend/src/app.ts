import express from "express";
import cors from "cors";
import { createRequire } from "node:module";
import type { RequestHandler } from "express";
import notFoundHandler from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

import contactRoutes from "./routes/contact.routes.js";
import { env } from "./config/env.js";

const require = createRequire(import.meta.url);
const helmet = require("helmet") as () => RequestHandler;
const rateLimit = require("express-rate-limit") as (options: object) => RequestHandler;

const app = express();

// Hide the Express framework fingerprint.
app.disable("x-powered-by");

// Add standard HTTP security headers.
app.use(helmet());

// Configure allowed browser origins.
app.use(
  cors({
    origin:
      env.CORS_ORIGIN === "*"
        ? "*"
        : env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

// General API rate limit: 100 requests per 15 minutes per IP.
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// Stricter limit for contact form submissions:
// 10 requests per 15 minutes per IP.
const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many contact submissions. Please try again later.",
  },
});

// Apply rate limits before parsing request bodies.
app.use("/api", apiRateLimiter);
app.use("/api/contact", contactRateLimiter);

// Limit incoming JSON request bodies to 10 KB.
app.use(express.json({ limit: "10kb" }));

// Health check endpoint.
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running.",
  });
});

// Contact form API.
app.use("/api/contact", contactRoutes);

// Handle unknown routes before the centralized error handler.
app.use(notFoundHandler);

// Centralized error handler must remain last.
app.use(errorHandler);

export default app;