import { getSubscriptionAction } from "@/app/actions";
import { getBusinessAction } from "@/app/actions/business";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useServerActionQuery } from "@/lib/hooks/server-action-hooks";
import { differenceInDays, formatDate } from "date-fns";
import Link from "next/link";
import { PageHeader } from "./PageHeader";

export function SubscriptionTab() {
  const { data, isPending } = useServerActionQuery(getBusinessAction, {
    input: undefined,
    queryKey: ["getBusiness"],
  });

  const business = data?.data;

  const { data: subscriptionData } = useServerActionQuery(
    getSubscriptionAction,
    {
      input: business?.subscriptionId as string,
      queryKey: ["getSubscription"],
      enabled: !!business?.subscriptionId,
    },
  );

  const subscription = subscriptionData?.data;
  if (isPending) return <div>Loading...</div>;
  return (
    <section className="pt-10">
      <div className="flex gap-4 items-center">
        <div className="mt-1">
          <PageHeader title="Subscription" />
        </div>
        {business?.subscriptionEndDate && (
          <Badge className="bg-[hsla(25,64%,59%,1)] py-2 h-4 text-[10px] rounded-sm text-white-100 ">
            {differenceInDays(business?.subscriptionEndDate, new Date())} days
            left
          </Badge>
        )}
      </div>
      <div className="grid border border-[hsla(220,31%,94%,1)] divide-x divide-[hsla(220,31%,94%,1)] grid-cols-3">
        <div className="px-5 py-4">
          <h6 className="font-satoshi capitalize mb-2 font-medium text-lg text-[#575757]">
            {subscription?.plan ?? "basic"} Plan
          </h6>
          {/* <p className="font-normal text-sm text-gray-2 font-satoshi">
            100 out of 300 customer base available.
          </p> */}
        </div>
        {/* <div className="px-5 py-4">
          <h6 className="font-satoshi mb-2 font-medium text-lg text-[#575757]">
            5 Agents
          </h6>
          <p className="font-normal text-sm text-gray-2 font-satoshi">
            2 in use
          </p>
          <p className="font-bold text-sm text-gray-2 font-satoshi">
            3 available
          </p>
        </div> */}
        {business?.subscriptionEndDate && (
          <div className="px-5 py-4">
            <h6 className="font-satoshi mb-2 font-medium text-lg text-[#575757]">
              Days Left
            </h6>
            <p className="font-normal text-sm text-gray-2 font-satoshi">
              Expires on{" "}
              {formatDate(business?.subscriptionEndDate, "do, MMMM yyyy")}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between px-5 py-6 border-x border-b border-[hsla(220,31%,94%,1)]">
        <p>
          Have questions about your plan?{" "}
          <Link className="text-blue-400 hover:underline " href="/pricing">
            Learn about plans and pricing
          </Link>{" "}
        </p>

        <Button size="sm" variant="outline">
          Choose a plan to purchase{" "}
        </Button>
      </div>

      {subscription?.plan !== "enterprise" && (
        <Button className="mt-10 px-10">Upgrade Plan </Button>
      )}
    </section>
  );
}
