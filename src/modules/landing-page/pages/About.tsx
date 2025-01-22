"use client";

import BlurIn from "@/components/animations/blur-in";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AboutItem } from "../components/AboutItem";
import NumberCounter from "../components/NumberCounter";

export function About() {
  return (
    <main className="px-6">
      <div className=" mx-auto max-w-4xl pt-10 text-center">
        <BlurIn
          word="  Empowering businesses to thrive"
          className="font-coreC text-5xl font-normal text-black-100 "
        />

        <p className="mt-2 font-satoshi text-lg font-normal text-gray-2">
          Adora is a state-of-the-art AI technology that solve customer base
          problems for ambitious businesses. Our mission is to shape businesses
          and be partners in success.
        </p>
      </div>

      <div className="mt-20 space-y-3 md:px-20">
        <AboutItem
          variant="reverse"
          image="/images/about1.png"
          title="Who We Are"
          description="We are Adora—an innovative force driving the future of customer service. Join us on our journey as we redefine what’s possible and create a world where every customer interaction leaves a lasting impression."
        />
        <AboutItem
          image="/images/about2.png"
          title="What We Do"
          description="At Adora, we specialize in leveraging cutting-edge AI technology to transform customer service. We provide businesses with innovative solutions that combine the empathy of human agents with the efficiency and scalability of AI. From setting up AI-powered call centers to delivering personalized customer interactions, we’re dedicated to redefining the customer service experience for businesses worldwide."
        />
      </div>

      <div className="flex flex-col md:flex-row mx-auto my-10 max-w-3xl items-center justify-between">
        <NumberCounter value={87} label="Satisfied Clients" />
        <NumberCounter value={150} label="Projects Completed" />
        <NumberCounter value={28} label="Accolades Earned​" />
        <NumberCounter value={56000} label="Lines of Code​" />
      </div>

      <div className="mb-20 flex flex-col items-center justify-between gap-5 bg-brown-200 p-6   md:flex-row md:p-10">
        <div>
          <h6 className="mb-3  font-coreC text-2xl sm:text-4xl font-medium text-white-100">
            Would you like to start a project with us?
          </h6>
          <p className="font-coreC text-lg sm:text-2xl font-normal text-white-200">
            Join us at Adora and revolutionize your approach to customer
            service.
          </p>
        </div>

        <Link
          href="/contact-us"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "bg-white-100 px-6 text-primary",
          )}
        >
          Contact Us
        </Link>
      </div>
    </main>
  );
}
