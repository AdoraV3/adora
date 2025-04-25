import { getBusinessAction } from "@/app/actions/business";
import { getSubscriptionAction } from "@/app/actions/subscription";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { useServerActionQuery } from "@/lib/hooks/server-action-hooks";
import { QueryKeyFactory } from "@/lib/queryKeyFactory";
import { cn } from "@/lib/utils";
import { differenceInDays, formatDate } from "date-fns";
import Link from "next/link";
import AgentDetails from "./AgentDetails";
import { PageHeader } from "./PageHeader";

export function AccountInfo() {
  const { data, isPending } = useServerActionQuery(getBusinessAction, {
    input: undefined,
    queryKey: QueryKeyFactory.getBusinessProfile(),
  });

  const businessProfile = data?.data;

  const { data: subscriptionData } = useServerActionQuery(
    getSubscriptionAction,
    {
      input: businessProfile?.subscriptionId as string,
      queryKey: QueryKeyFactory.getSubscription(
        businessProfile?.subscriptionId,
      ),
      enabled: !!businessProfile?.subscriptionId,
    },
  );

  const subscription = subscriptionData?.data;

  const daysLeft = differenceInDays(
    businessProfile?.subscriptionEndDate ?? new Date(),
    new Date(),
  );

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="pt-10">
      <h6 className="text-4xl text-black-100 font-normal pb-3 font-coreC ">
        <PageHeader title="Account Info" />
      </h6>
      <section className="grid grid-cols-2 gap-10 mt-2 max-w-2xl">
        <div className="flex gap-3 items-center">
          <h6 className="font-medium text-sm text-black-100 font-satoshi">
            {businessProfile?.name}
          </h6>

          {businessProfile?.subscriptionEndDate && (
            <Badge className="bg-[hsla(25,64%,59%,1)] py-2 h-4 text-[10px] rounded-sm text-white-100 ">
              {daysLeft > 0 ? daysLeft : 0} days left
            </Badge>
          )}
        </div>

        <div>
          <h6 className="font-normal mb-1 font-satoshi text-sm text-gray-2">
            Joined account on
          </h6>
          <p className="text-black-100 font-satoshi font-medium text-sm">
            {formatDate(
              businessProfile?.createdAt ?? new Date(),
              "MMMM, dd yyyy",
            )}
          </p>
        </div>
        <div>
          <h6 className="font-normal mb-1 font-satoshi text-sm text-gray-2">
            Subscription
          </h6>
          <p className="text-black-100 capitalize mb-1 font-satoshi font-medium text-sm">
            {subscription?.plan ?? "basic"} plan
          </p>
        </div>

        <div>
          <h6 className="font-normal mb-1 font-satoshi text-sm text-gray-2">
            Account registration date
          </h6>
          <p className="text-black-100 font-satoshi font-medium text-sm">
            {formatDate(
              businessProfile?.createdAt ?? new Date(),
              "MMMM, dd yyyy",
            )}
          </p>
        </div>
      </section>

      <Link
        href="/profile"
        className={cn(
          buttonVariants({ variant: "default" }),
          "my-5 bg-brown-300 capitalize",
        )}
      >
        Manage {businessProfile?.name}{" "}
      </Link>

      <section className="mt-10 max-w-3xl">
        <AgentDetails />
      </section>
    </div>
  );
}
