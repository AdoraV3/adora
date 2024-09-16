import { db } from "@/db";
import {
  NewSubscription,
  subscription,
  subscriptionPlanEnum,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createSubscription(data: NewSubscription) {
  return db
    .insert(subscription)
    .values({
      ...data,
    })
    .onConflictDoNothing();
}

export async function getSubscriptions() {
  return db.query.subscription.findMany();
}

export async function getSubscription(subscriptionId: string) {
  return db.query.subscription.findFirst({
    where: eq(subscription.id, subscriptionId),
  });
}

export async function getPlan(plan: (typeof subscriptionPlanEnum)[number]) {
  return db.query.subscription.findFirst({
    where: eq(subscription.plan, plan),
  });
}

export async function getSubscriptionByPriceId(priceId: string) {
  return db.query.subscription.findFirst({
    where: eq(subscription.priceId, priceId),
  });
}
