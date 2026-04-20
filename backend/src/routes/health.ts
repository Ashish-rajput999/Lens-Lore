import { Router } from "express";
import { getMissingEnvKeys } from "../config/env.js";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "lens-and-lore-backend",
    timestamp: new Date().toISOString(),
    missingEnv: getMissingEnvKeys(),
  });
});
