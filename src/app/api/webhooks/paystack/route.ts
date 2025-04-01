import {
  getBusiness,
  getSubscriberByEmail,
  updateBusiness,
} from "@/data-access";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line sonarjs/cognitive-complexity
export async function POST(req: NextRequest) {
  const hash = crypto
    .createHmac("sha512", "")
    .update(JSON.stringify(req.body))
    .digest("hex");

  const signature = req.headers.get("x-paystack-signature") ?? "";
  const webhook = (await req.text()) as any;
  const response = JSON.parse(webhook);

  // eslint-disable-next-line security/detect-possible-timing-attacks
  if (hash === signature) {
    switch (webhook?.event) {
      // case "subscription.create": // Sent when a subscription is created successfully
      case "charge.success": {
        const customerEmail = response.data.customer.email;
        const customerId = response.data.customer.customer_code;

        // eslint-disable-next-line no-console

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

        const business = await getBusiness(user.id);

        if (!business) {
          return NextResponse.json({
            status: 404,
            error: "business not found",
          });
        }
        if (!business?.stripeCustomerId) {
          await updateBusiness(user.id, {
            stripeCustomerId: customerId,
          });
        }
        // Sent when a subscription payment is made successfully
        break;
      }
      // case "invoice.create": // Sent when an invoice is created to capture an upcoming subscription charge. Should happen 2-3 days before the charge happens
      // case "invoice.payment_failed": // Sent when a subscription payment fails
      // case "subscription.not_renew": // Sent when a subscription is canceled to indicate that it won't be charged on the next payment date
      case "subscription.disable":
        break; // Sent when a canceled subscription reaches the end of the subscription period
      // case "subscription.expiring_cards": // Sent at the beginning of each month with info on what cards are expiring that month
      default:
        console.warn(`Unhandled event type ${webhook.event}`);
    }
    return new Response("Webhook received", { status: 200 });
  }

  return new Response("Webhook received", { status: 200 });
}
