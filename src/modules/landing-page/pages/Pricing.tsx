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
      <div className="mx-auto flex max-w-6xl flex-col items-center px-10 sm:flex-row md:justify-between">
        <div>
          <BlurIn
            word="Plans & Pricing"
            className="mb-2 font-coreC text-5xl  font-normal text-black-100 "
          />

          <p className="font-satoshi text-lg font-normal text-gray-2">
            Navigate flexible pricing, designed to accommodate your distinct
            needs.
          </p>
        </div>

        <div className="mt-10 rounded-full border border-primary uppercase sm:mt-0">
          <Button
            size="sm"
            className={cn(
              "w-[110px] rounded-full bg-white-100 text-xs font-medium uppercase text-primary  ",
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
              "w-[110px] rounded-full  bg-white-100 text-xs font-medium uppercase text-primary ",
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

      <div className="my-5 flex flex-col items-center justify-center gap-5 bg-brown-200 p-6  md:p-10">
        <div className="text-center">
          <h6 className="font-coreC  text-4xl font-medium text-white-100">
            Need Help?
          </h6>
          <p className="mb-3  text-center font-satoshi text-sm font-normal text-[hsla(0,0%,81%,1)] ">
            We Offer 24 Hours Service from Mon-Sat
          </p>
        </div>

        <Link
          href="/contact-us"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "bg-white-100 px-10 text-primary",
          )}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
