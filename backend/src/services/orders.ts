import Stripe from "stripe";
import { supabaseAdmin } from "../lib/supabase.js";

function mapOrderStatus(status: Stripe.Checkout.Session["payment_status"]) {
  switch (status) {
    case "paid":
      return "paid";
    case "unpaid":
      return "pending";
    case "no_payment_required":
      return "completed";
    default:
      return "pending";
  }
}

export async function upsertOrderFromCheckoutSession(
  session: Stripe.Checkout.Session,
) {
  const userId = session.metadata?.user_id;

  if (!userId) {
    throw new Error("Checkout session is missing metadata.user_id");
  }

  const items =
    typeof session.metadata?.items === "string"
      ? JSON.parse(session.metadata.items)
      : [];

  const orderPayload = {
    user_id: userId,
    stripe_session_id: session.id,
    items,
    total: session.amount_total ? session.amount_total / 100 : 0,
    status: mapOrderStatus(session.payment_status),
  };

  const { error } = await supabaseAdmin
    .from("orders")
    .upsert(orderPayload, { onConflict: "stripe_session_id" });

  if (error) {
    throw error;
  }
}
