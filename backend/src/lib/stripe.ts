import Stripe from "stripe";
import { env, requireEnv } from "../config/env.js";

let stripeSingleton: Stripe | undefined;

export function getStripe() {
  if (stripeSingleton) {
    return stripeSingleton;
  }

  stripeSingleton = new Stripe(
    requireEnv(
      env.STRIPE_SECRET_KEY,
      "STRIPE_SECRET_KEY",
      "Add it to backend/.env before using Stripe routes.",
    ),
    {
      appInfo: {
        name: "LENS & LORE Backend",
      },
    },
  );

  return stripeSingleton;
}
