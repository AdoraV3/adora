"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryParams } from "@/modules/commons/hooks/useQueryParams";
import Link from "next/link";
import { AccountInfo } from "../account-settings/AccountInfo";
import { AccountPreferenceTab } from "../account-settings/AccountPreferenceTab";
import { Email } from "../account-settings/Email";
import { SecurityTab } from "../account-settings/SecurityTab";
import { SubscriptionTab } from "../account-settings/SubscriptionTab";

export function AccountSettings() {
  const { queryParams } = useQueryParams();
  const activeTab = queryParams.get("tab") ?? "accountInfo";
  return (
    <div className="overflow-hidden">
      <Tabs
        defaultValue={activeTab}
        className="w-full overflow-x-scroll sticky top-5 z-10 py-5 bg-white-100"
      >
        <TabsList className="border-b justify-start border-input w-full">
          <TabsTrigger
            className="font-normal font-satoshi text-base"
            value="accountInfo"
          >
            <Link className="w-full" href="?tab=accountInfo">
              Account Info
            </Link>
          </TabsTrigger>
          <TabsTrigger
            className="font-normal font-satoshi text-base"
            value="email"
          >
            <Link className="w-full" href="?tab=email">
              Email
            </Link>
          </TabsTrigger>
          <TabsTrigger
            className="font-normal font-satoshi text-base"
            value="security"
          >
            <Link className="w-full" href="?tab=security">
              Security
            </Link>
          </TabsTrigger>
          <TabsTrigger
            className="font-normal font-satoshi text-base"
            value="preference"
          >
            <Link className="w-full" href="?tab=preference">
              Account Preference
            </Link>
          </TabsTrigger>
          <TabsTrigger
            className="font-normal font-satoshi text-base"
            value="subscription"
          >
            <Link className="w-full" href="?tab=subscription">
              Subscription
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="accountInfo">
          <AccountInfo />
        </TabsContent>
        <TabsContent value="email">
          <Email />
        </TabsContent>
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
        <TabsContent value="preference">
          <AccountPreferenceTab />
        </TabsContent>
        <TabsContent value="subscription">
          <SubscriptionTab />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
