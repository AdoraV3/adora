"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function CreateAccount() {
  return (
    <div className="mx-4 mb-24 mt-20 flex flex-col items-center justify-between gap-5 rounded-[20px] border border-[#8c8c8c10] bg-white-100 px-6 py-8 shadow-lg  md:mx-10 md:flex-row md:px-10 md:py-16">
      <div>
        <h6 className="mb-2 text-center font-satoshi text-2xl font-normal text-gray-2  md:text-left">
          Try Adora Now
        </h6>
        <p className="text-center font-coreC text-lg font-normal text-black-100 md:text-left  md:text-3xl">
          Start transforming your business
        </p>
      </div>

      <Link
        href="/register"
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "px-6",
        )}
      >
        Create an account
      </Link>
    </div>
  );
}
