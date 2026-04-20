import express, { Router } from "express";
import { env, requireEnv } from "../config/env.js";
import { getStripe } from "../lib/stripe.js";
import { upsertOrderFromCheckoutSession } from "../services/orders.js";

export const webhookRouter = Router();

webhookRouter.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["stripe-signature"];

    if (!signature || typeof signature !== "string") {
      res.status(400).json({ error: "Missing Stripe signature" });
      return;
    }

    let event;

    try {
      event = getStripe().webhooks.constructEvent(
        req.body,
        signature,
        requireEnv(
          env.STRIPE_WEBHOOK_SECRET,
          "STRIPE_WEBHOOK_SECRET",
          "Add it to backend/.env before receiving Stripe webhooks.",
        ),
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid webhook signature";
      res.status(400).json({ error: message });
      return;
    }

    try {
      if (event.type === "checkout.session.completed") {
        await upsertOrderFromCheckoutSession(event.data.object);
      }

      if (event.type === "checkout.session.async_payment_succeeded") {
        await upsertOrderFromCheckoutSession(event.data.object);
      }

      res.json({ received: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Webhook processing failed";
      res.status(500).json({ error: message });
    }
  },
);
