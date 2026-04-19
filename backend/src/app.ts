import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { healthRouter } from "./routes/health.js";
import { lookbooksRouter } from "./routes/lookbooks.js";
import { webhookRouter } from "./routes/webhooks.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(
    cors({
      origin: env.APP_ORIGIN,
      credentials: true,
    }),
  );

  app.use("/api/webhooks", webhookRouter);
  app.use(express.json({ limit: "2mb" }));
  app.use("/api/health", healthRouter);
  app.use("/api/lookbooks", lookbooksRouter);

  app.use(
    (
      error: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      const message =
        error instanceof Error ? error.message : "Unexpected server error";

      res.status(500).json({
        error: message,
      });
    },
  );

  return app;
}
