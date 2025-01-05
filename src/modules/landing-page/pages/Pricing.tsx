"use client";

import { getSubscriptionsAction } from "@/app/actions";
import BlurIn from "@/components/animations/blur-in";
import { Button, buttonVariants } from "@/components/ui/button";
import { useServerActionQuery } from "@/lib/hooks/server-action-hooks";
import { cn } from "@/lib/utils";
import { renderQueryState } from "@/modules/commons/utils/renderQueryState";
import Link from "next/link";
import { useState } from "react";
import { PricingData } from "../components/PricingData";

export function Pricing() {
  const subscriptionQuery = useServerActionQuery(getSubscriptionsAction, {
    input: undefined,
    queryKey: ["getSubscriptions"],
  });
  const [view, setView] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="my-10">
      <div className="flex flex-col sm:flex-row md:justify-between px-10 max-w-6xl mx-auto items-center">
        <div>
          <BlurIn
            word="Plans & Pricing"
            className="font-normal mb-2 font-coreC  text-black-100 text-5xl "
          />

          <p className="font-normal text-gray-2 font-satoshi text-lg">
            Navigate flexible pricing, designed to accommodate your distinct
            needs.
          </p>
        </div>

        <div className="mt-10 sm:mt-0 uppercase border border-primary rounded-full">
          <Button
            size="sm"
            className={cn(
              "uppercase text-primary rounded-full bg-white-100 font-medium w-[110px] text-xs  ",
              {
                "bg-primary text-white-100": view === "monthly",
              },
            )}
            variant="ghost"
            onClick={() => setView("monthly")}
          >
            Monthly{" "}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "uppercase text-primary  rounded-full bg-white-100 font-medium w-[110px] text-xs ",
              {
                "bg-primary text-white-100": view === "yearly",
              },
            )}
            onClick={() => setView("yearly")}
          >
            {" "}
            Yearly
          </Button>
        </div>
      </div>
      {renderQueryState(subscriptionQuery, {
        LoadingStateView: <div>Loading...</div>,
        ErrorStateView: () => <div>Error...</div>,
        SuccessStateView: ({ data }) => {
          return <PricingData subscriptions={data.subscriptions} view={view} />;
        },
      })}

      <div className="flex gap-5 bg-brown-200 justify-center flex-col p-6 md:p-10 my-5  items-center">
        <div className="text-center">
          <h6 className="font-medium  text-white-100 text-4xl font-coreC">
            Need Help?
          </h6>
          <p className="font-satoshi  text-center mb-3 font-normal text-sm text-[hsla(0,0%,81%,1)] ">
            We Offer 24 Hours Service from Mon-Sat
          </p>
        </div>

        <Link
          href="/contact-us"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "px-10 bg-white-100 text-primary",
          )}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
