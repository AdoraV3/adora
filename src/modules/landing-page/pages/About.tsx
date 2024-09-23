"use client";

import BlurIn from "@/components/animations/blur-in";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AboutItem } from "../components/AboutItem";
import NumberCounter from "../components/NumberCounter";

export function About() {
  return (
    <main>
      <div className=" text-center pt-10 max-w-4xl mx-auto">
        <BlurIn
          word="  Empowering businesses to thrive"
          className="font-normal font-coreC text-[#575757] text-5xl "
        />

        <p className="font-normal font-satoshi text-lg text-gray-2 mt-2">
          Adora is a state-of-the-art AI technology that solve customer base
          problems for ambitious businesses. Our mission is to shape businesses
          and be partners in success.
        </p>
      </div>

      <div className="mt-20 px-20 space-y-3">
        <AboutItem
          variant="reverse"
          image="/images/who.png"
          title="Who We Are"
          description="We are Adora—an innovative force driving the future of customer service. Join us on our journey as we redefine what’s possible and create a world where every customer interaction leaves a lasting impression."
        />
        <AboutItem
          image="/images/what.png"
          title="What We Do"
          description="At Adora, we specialize in leveraging cutting-edge AI technology to transform customer service. We provide businesses with innovative solutions that combine the empathy of human agents with the efficiency and scalability of AI. From setting up AI-powered call centers to delivering personalized customer interactions, we’re dedicated to redefining the customer service experience for businesses worldwide."
        />
      </div>

      <div className="max-w-3xl mx-auto my-10 flex justify-between items-center">
        <NumberCounter value={87} label="Satisfied Clients" />
        <NumberCounter value={150} label="Projects Completed" />
        <NumberCounter value={28} label="Accolades Earned​" />
        <NumberCounter value={56000} label="Lines of Code​" />
      </div>

      <div className="flex gap-5 bg-brown-200 md:flex-row flex-col p-6 md:p-10 mb-20   justify-between items-center">
        <div>
          <h6 className="font-medium  mb-3 text-white-100 text-4xl font-coreC">
            Would you like to start a project with us?
          </h6>
          <p className="font-coreC font-normal text-2xl text-white-200">
            Join us at Adora and revolutionize your approach to customer
            service.
          </p>
        </div>

        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "px-6 bg-white-100 text-primary",
          )}
        >
          Contact Us
        </Link>
      </div>
    </main>
  );
}
