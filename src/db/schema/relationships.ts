import { relations } from "drizzle-orm";
import { account } from "./account";
import { accountPreference } from "./accountPreference";
import { agent } from "./agent";
import { availablePhoneNumber } from "./availablePhoneNumber";
import { business } from "./business";
import { callLog } from "./call-log";
import { knowledgeBase } from "./knowledge-base";
import { outboundBound } from "./outbound-call";
import { profile } from "./profile";
import { subscription } from "./subscription";
import { user } from "./user";
import { userBusiness } from "./userBusiness";
import { verifyEmailToken } from "./verifyEmailToken";
import { voice } from "./voice";

export const businessRelations = relations(business, ({ many, one }) => ({
  knowledgeBase: many(knowledgeBase),
  callLogs: many(callLog),
  agent: one(agent, {
    fields: [business.agentId],
    references: [agent.id],
  }),
  outboundCall: many(outboundBound),
  user: one(user, {
    fields: [business.id],
    references: [user.id],
  }),
  userBusiness: many(userBusiness),
  subscription: one(subscription, {
    fields: [business.subscriptionId],
    references: [subscription.id],
  }),
}));

export const agentRelations = relations(agent, ({ one }) => ({
  business: one(business, {
    fields: [agent.id],
    references: [business.agentId],
  }),
  phoneNumber: one(availablePhoneNumber, {
    fields: [agent.phoneNumberId],
    references: [availablePhoneNumber.id],
  }),
  voice: one(voice, {
    fields: [agent.voiceId],
    references: [voice.id],
  }),
}));

export const subscriptionRelations = relations(subscription, ({ many }) => ({
  business: many(business),
}));

export const userRelations = relations(user, ({ one, many }) => ({
  accountPreferences: one(accountPreference, {
    fields: [user.id],
    references: [accountPreference.userId],
  }),
  userBusiness: many(userBusiness),
  profile: one(profile, {
    fields: [user.id],
    references: [profile.userId],
  }),
  business: many(business),
  account: one(account, {
    fields: [user.id],
    references: [account.userId],
  }),
  verifyEmailToken: one(verifyEmailToken, {
    fields: [user.id],
    references: [verifyEmailToken.userId],
  }),
}));

export const callLogRelations = relations(callLog, ({ one }) => ({
  business: one(business, {
    fields: [callLog.businessId],
    references: [business.id],
  }),
}));

export const knowledgeBaseRelations = relations(knowledgeBase, ({ one }) => ({
  business: one(business, {
    fields: [knowledgeBase.businessId],
    references: [business.id],
  }),
}));

export const outboundBoundRelations = relations(outboundBound, ({ one }) => ({
  business: one(business, {
    fields: [outboundBound.businessId],
    references: [business.id],
  }),
}));

export const userBusinessRelations = relations(userBusiness, ({ one }) => ({
  user: one(user, {
    fields: [userBusiness.userId],
    references: [user.id],
  }),
  business: one(business, {
    fields: [userBusiness.businessId],
    references: [business.id],
  }),
}));

export const verifyEmailTokenRelations = relations(
  verifyEmailToken,
  ({ one }) => ({
    user: one(user, {
      fields: [verifyEmailToken.userId],
      references: [user.id],
    }),
  }),
);
