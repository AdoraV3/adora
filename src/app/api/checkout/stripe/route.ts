import { getBusiness, getSubscriberByEmail } from "@/data-access";
import { stripe, updateSubscriptions } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(new URL("/pricing", request.url));
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer", "subscription"],
    });

    if (!session.customer || typeof session.customer === "string") {
      throw new Error("Invalid customer data from Stripe.");
    }

    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription?.id;

    if (!subscriptionId) {
      throw new Error("No subscription found for this session.");
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["items.data.price.product"],
    });

    const plan = subscription.items.data[0]?.price;

    if (!plan) {
      throw new Error("No plan found for this subscription.");
    }

    const productId = (plan.product as Stripe.Product).id;

    if (!productId) {
      throw new Error("No product ID found for this subscription.");
    }

    const userSessionId = session.client_reference_id;
    if (!userSessionId) {
      throw new Error("No user ID found in session's client_reference_id.");
    }

    const customerEmail = session.customer_details?.email;

    if (!customerEmail) {
      return NextResponse.json({
        status: 500,
        error: "Customer email could not be fetched",
      });
    }

    const user = await getSubscriberByEmail(customerEmail);

    if (!user) {
      return NextResponse.json({
        status: 404,
        error: "user not found",
      });
    }

    const findBusiness = await getBusiness(user.id);

    if (!findBusiness) {
      return NextResponse.json({
        status: 404,
        error: "Business not found",
      });
    }

    await updateSubscriptions(findBusiness, subscription.items.data);

    return NextResponse.redirect(new URL("/home", request.url));
  } catch (error) {
    console.error("Error handling successful checkout:", error);
    return NextResponse.redirect(new URL("/cancel", request.url));
  }
}
