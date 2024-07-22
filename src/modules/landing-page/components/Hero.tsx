import WordRotate from "@/components/animations/rotate";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const words = [
  "E-commerce",
  "Logistics",
  "Healthcare",
  "Real Estate",
  "Education",
  "Finance",
  "Insurance",
  "Retail",
  "Hospitality",
  "Travel",
  "Telecom",
  "Utilities",
  "Agriculture",
  "Media",
  "Entertainment",
  "Government",
  "Non-profit",
  "Businesses",
];

export function Hero() {
  return (
    <section className="pt-10">
      <div className="px-4 md:px-20">
        <h1 className="font-normal mb-3 flex items-center gap-3  tracking-tight font-coreC  text-black-100 text-xl md:text-5xl ">
          <span className="bg-gradient-to-b text-transparent from-black-100 to-primary  bg-clip-text">
            AI{" "}
          </span>{" "}
          Customer Support Solutions For <WordRotate words={words} />
        </h1>

        <p className="text-gray-2 max-w-3xl mx-auto text-center font-coreC text-lg font-light">
          Adora is ideal for various business use cases including front desk,
          outbound sales, lead generation, transportation, logistics and more.
        </p>
      </div>

      <div className="flex mt-10 justify-center">
        <Button className="flex gap-2 items-center">
          <p>Get Started for free</p>
          <Icons.ArrowRight />
        </Button>
      </div>

      <div className=" h-[230px] md:h-[460px]  relative">
        <Image src="/images/hero-wavy.png" alt="hero" fill />
      </div>
    </section>
  );
}
