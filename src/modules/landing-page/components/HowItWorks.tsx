"use client";
//
import BlurIn from "@/components/animations/blur-in";
import { HowItWorksItem } from "./HowItWorksItem";
import { useEffect, useRef, useState } from "react";

export function HowItWorks() {
  function useIsVisible(ref: any) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting);
      });

      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }, [ref]);

    return isIntersecting;
  }

  const UNI_REF = useRef<HTMLDivElement>(null);
  const ref1 = UNI_REF;
  const isVisible1 = useIsVisible(ref1);

  const ref2 = UNI_REF;
  const isVisible2 = useIsVisible(ref2);

  const ref3 = UNI_REF;
  const isVisible3 = useIsVisible(ref3);

  const ref4 = UNI_REF;
  const isVisible4 = useIsVisible(ref3);

  return (
    <section className="grid items-center gap-5 px-4 py-20 md:grid-cols-2 md:px-12">
      <div>
        <BlurIn
          word=" How it works"
          className="pb-2 font-coreC text-4xl text-black-100"
        />

        <p className="max-w-sm font-satoshi text-lg font-normal text-gray-2">
          Thousands of organizations of all sizes trust Adora to grow their
          business.
        </p>
      </div>

      <div
        ref={ref1}
        className={`transition-opacity duration-700 ease-in ${
          isVisible1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <HowItWorksItem
          subTitle="Choose a phone number, voice, language, give it a name to create a custom AI agent that reflects your brand."
          title="Set up your AI agent"
          isActive
        />
      </div>
      <div
        ref={ref2}
        className={`transition-opacity duration-700 ease-in ${
          isVisible2 ? "opacity-100" : "opacity-0"
        }`}
      >
        <HowItWorksItem
          subTitle="Add company information and scripts to empower your AI agent with the tools to handle customer inquiries like a pro."
          title="Upload to knowledge base"
        />
      </div>
      <div
        ref={ref3}
        className={`transition-opacity duration-700 ease-in ${
          isVisible3 ? "opacity-100" : "opacity-0"
        }`}
      >
        <HowItWorksItem
          subTitle="Make your assigned phone number available to your customers and watch as incoming calls are resolved instantly with speed and efficiency."
          title="Go live"
        />
      </div>
      <div
        ref={ref4}
        className={`transition-opacity duration-700 ease-in ${
          isVisible4 ? "opacity-100" : "opacity-0"
        }`}
      >
        <HowItWorksItem
          subTitle="Handle over 1 million concurrent calls with our Kubernetes-based infrastructure designed for scalability and high availability."
          title="Scale with ease"
        />
      </div>
    </section>
  );
}
