import { Router } from "express";
import { z } from "zod";
import { createLookbook, listPublicLookbooks } from "../services/lookbooks.js";

const canvasItemSchema = z.object({
  productSanityId: z.string().min(1),
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  height: z.number().positive(),
  zIndex: z.number().int(),
});

const lookbookSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().min(2),
  description: z.string().optional(),
  isPublic: z.boolean().optional(),
  thumbnailUrl: z.string().url().optional(),
  canvasData: z.object({
    title: z.string().min(2),
    description: z.string(),
    background: z.object({
      color: z.string().min(1),
      texture: z.string().min(1),
    }),
    items: z.array(canvasItemSchema),
  }),
});

export const lookbooksRouter = Router();

lookbooksRouter.get("/public", async (_req, res, next) => {
  try {
    const lookbooks = await listPublicLookbooks();
    res.json({ data: lookbooks });
  } catch (error) {
    next(error);
  }
});

lookbooksRouter.post("/", async (req, res, next) => {
  try {
    const input = lookbookSchema.parse(req.body);
    const lookbook = await createLookbook(input);
    res.status(201).json({ data: lookbook });
  } catch (error) {
    next(error);
  }
});
