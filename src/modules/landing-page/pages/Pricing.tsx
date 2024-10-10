"use client";

import BlurIn from "@/components/animations/blur-in";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRICING_PLANS } from "@/mock";
import { useFormatNumber } from "@/modules/commons/hooks/useFormatNumber";
import { useGetLocation } from "@/modules/commons/hooks/useGetLocation";
import { getRegionalPrice } from "@/modules/commons/utils/helpers";
import Link from "next/link";
import { useState } from "react";
import { PricingCard } from "./pricing/components/PricingCard";

export function Pricing() {
  const formatCurrency = useFormatNumber();
  const { data } = useGetLocation();

  const [view, setView] = useState<"monthly" | "yearly">("monthly");
  const isYearly = view === "yearly";
  return (
    <div className="my-10">
      <div className="flex flex-col sm:flex-row md:justify-between px-10 max-w-6xl mx-auto items-center">
        <div>
          <BlurIn
            word="Plans & Pricing"
            className="font-normal mb-2 font-coreC  text-[#575757] text-5xl "
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
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 rounded-2xl gap-4 bg-white-100 shadow-[0px_4px_25px_0px_hsla(0 0%,0%,0.05)] sm:mt-8">
        {PRICING_PLANS.map(plan => {
          return (
            <PricingCard
              price={formatCurrency(
                getRegionalPrice(plan, view, data?.country),
                {
                  style: "currency",
                  currencyDisplay: "symbol",
                  currency: data?.country === "Nigeria" ? "USD" : "NGN",
                },
              )}
              key={plan.plan}
              isYearly={isYearly}
              features={plan.features}
              plan={plan?.plan}
              ctaText={plan.actionLabel}
              isPopular={plan.isPopular}
            />
          );
        })}
      </section>
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
