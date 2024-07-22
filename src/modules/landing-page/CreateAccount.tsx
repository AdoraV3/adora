"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function CreateAccount() {
  return (
    <div className="flex gap-5 md:flex-row flex-col p-6 md:p-10 my-20 mx-4 md:mx-10 rounded-[20px] bg-white-100  shadow-400 justify-between items-center">
      <div>
        <h6 className="font-normal mb-2 text-gray-2 text-2xl font-satoshi">
          Try Adora Now
        </h6>
        <p className="font-coreC font-normal text-lg md:text-3xl text-black-100">
          Start transforming your business
        </p>
      </div>

      <Link
        href="/register"
        className={cn(
          buttonVariants({ variant: "default", size: "sm" }),
          "px-6",
        )}
      >
        Create an account
      </Link>
    </div>
  );
}
