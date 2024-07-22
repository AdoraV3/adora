import { getBusinessProfileAction } from "@/app/actions/businessProfile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useServerActionQuery } from "@/lib/hooks/server-action-hooks";
import { formatDate } from "date-fns";
import AgentDetails from "./AgentDetails";
import { PageHeader } from "./PageHeader";

export function AccountInfo() {
  const { data, isPending } = useServerActionQuery(getBusinessProfileAction, {
    input: undefined,
    queryKey: ["getBusinessProfile"],
  });

  const businessProfile = data?.data.businessProfile;
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
          <Badge className="bg-[hsla(25,64%,59%,1)] rounded-md text-white-100 ">
            12 days left
          </Badge>
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
            {businessProfile?.plan} plan
          </p>
          <p className="text-black-100 mb-1 font-satoshi font-medium text-sm">
            5 agents
          </p>
          <p className="text-black-100 mb-1 font-satoshi font-medium text-sm">
            100-300 customer base
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

      <Button className="my-5 capitalize">
        Manage {businessProfile?.name}{" "}
      </Button>

      <section className="mt-10 max-w-3xl">
        <AgentDetails />
      </section>
    </div>
  );
}
