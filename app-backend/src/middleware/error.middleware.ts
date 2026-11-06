import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  const requestError = error as { type?: string };

  // Request body exceeded the configured 10 KB limit.
  if (requestError.type === "entity.too.large") {
    res.status(413).json({
      success: false,
      message: "Request body is too large.",
    });
    return;
  }

  // Request body contains invalid JSON.
  if (requestError.type === "entity.parse.failed") {
    res.status(400).json({
      success: false,
      message: "Invalid JSON request body.",
    });
    return;
  }

  // Log internal details, but never expose them to API clients.
  console.error(
    "Unhandled API error:",
    error instanceof Error ? error.message : "Unknown error",
  );

  res.status(500).json({
    success: false,
    message: "An unexpected server error occurred.",
  });
};

export default errorHandler;
