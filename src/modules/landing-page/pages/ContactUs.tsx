"use client";

import BlurImage from "@/components/animations/blur-image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ContactUsForm } from "../components/ContactUsForm";
import { PageHeader } from "../components/PageHeader";

export function ContactUs() {
  return (
    <section className="pt-20 px-4 flex flex-col flex-1 md:px-20">
      <div className="max-w-3xl  mx-auto">
        <PageHeader
          className="text-center mb-6"
          title="Contact Us"
          subTitle="We're here to help! Let us know how we can assist you with Adora."
        />
      </div>

      <div className="grid py-10  md:grid-cols-2 gap-5">
        <ContactUsForm />

        <BlurImage
          src="/images/marker.png"
          width={568}
          height={508}
          alt="marker"
          className="h-full w-full"
        />
      </div>

      <div className="flex gap-5 bg-brown-200 md:flex-row flex-col p-6 md:p-10 my-20 justify-between items-center">
        <div>
          <h6 className="font-coreC  mb-3 font-normal text-2xl text-white-200">
            Try Adora Now
          </h6>
          <p className="font-medium  text-white-100 text-4xl font-coreC">
            Start transforming your business
          </p>
        </div>

        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "px-6 bg-white-100 text-primary",
          )}
        >
          Get Started for Free
        </Link>
      </div>
    </section>
  );
}
