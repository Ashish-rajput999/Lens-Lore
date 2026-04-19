import express, { Router } from "express";
import { stripe } from "../lib/stripe.js";
import { env } from "../config/env.js";
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
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        env.STRIPE_WEBHOOK_SECRET,
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
