import app from "./app.js";
import { env } from "./config/env.js";
import { checkDatabaseConnection, pool } from "./config/database.js";

async function startServer(): Promise<void> {
  try {
    // Verify PostgreSQL before starting the HTTP server.
    await checkDatabaseConnection();

    let isShuttingDown = false;

    const server = app.listen(env.PORT, "0.0.0.0", () => {
      console.log("-----------------------------------");
      console.log("Portfolio API started successfully");
      console.log(`Environment: ${env.NODE_ENV}`);
      console.log(`Port: ${env.PORT}`);
      console.log(`Health: http://localhost:${env.PORT}/health`);
      console.log("-----------------------------------");
    });

    const shutdown = (signal: string): void => {
      if (isShuttingDown) {
        console.log("Shutdown already in progress.");
        return;
      }

      isShuttingDown = true;

      console.log(`${signal} received. Shutting down gracefully...`);

      const forceExitTimer = setTimeout(() => {
        console.error("Graceful shutdown timed out. Forcing process exit.");
        process.exit(1);
      }, 10_000);

      const httpClosePromise = new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });

      server.closeIdleConnections();

      void (async () => {
        try {
          // Wait for existing HTTP requests to finish.
          await httpClosePromise;

          // Close PostgreSQL after the HTTP server finishes.
          await pool.end();

          console.log("HTTP server and database pool closed successfully.");

          process.exit(0);
        } catch (shutdownError) {
          console.error("Error during graceful shutdown:", shutdownError);
          process.exit(1);
        } finally {
          clearTimeout(forceExitTimer);
        }
      })();
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("Failed to start Portfolio API:", error);

    await pool.end();

    process.exit(1);
  }
}

void startServer();
