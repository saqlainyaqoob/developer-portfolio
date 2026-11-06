import type { RequestHandler } from "express";

const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({
    success: false,
    message: "The requested API endpoint was not found.",
  });
};

export default notFoundHandler;
