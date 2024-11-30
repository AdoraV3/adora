import Stripe from "stripe";

export async function handleSubscriptionChange(
  subscription: Stripe.Subscription,
) {
  const customerId = subscription.customer as string;
  const subscriptionId = subscription.id;
  const status = subscription.status;

  if (status === "active" || status === "trialing") {
    const plan = subscription.items.data[0].plan;
  }
}
