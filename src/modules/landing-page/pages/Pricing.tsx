"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PageHeader } from "../components/PageHeader";

export function Pricing() {
  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <PageHeader
          title="Plans & Pricing"
          subTitle="Navigate flexible pricing, designed to accommodate your distinct needs."
        />
      </div>
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
