import WordRotate from "@/components/animations/rotate";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { hoverAnimation } from "@/utils/animations";
import Image from "next/image";

const words = [
  "Logistics",
  "Healthcare",
  "Real Estate",
  "Education",
  "Finance",
  "Hospitality",
  "Insurance",
  "Retail",
  "Travel",
  "Telecom",
  "Utilities",
  "Agriculture",
  "Media",
  "Government",
  "E-commerce",
  "Entertainment",
  "Non-profit",
  "Businesses",
];

export function Hero() {
  return (
    <section className="relative w-full pt-10">
      <div className="flex flex-col items-center px-4 md:px-20">
        <h1 className="mb-3 flex flex-row flex-wrap  items-center gap-3 text-center  font-coreC text-2xl  font-normal tracking-tight text-[#575757] md:text-5xl">
          <span className="hidden md:block bg-gradient-to-b from-black-100 to-primary bg-clip-text  text-transparent">
            AI{" "}
          </span>{" "}
          <span className="md:hidden">AI</span> Customer Support Solutions For <WordRotate words={words} />
        
        </h1>

        <p className="mx-auto max-w-3xl text-center font-coreC text-lg font-light text-gray-2">
          Adora is ideal for various business use cases including front desk,
          outbound sales, lead generation, transportation, logistics and more.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <Button className="flex items-center gap-2">
          <p>Get Started for free</p>
          <Icons.ArrowRight />
        </Button>
      </div>

      <div className=" relative h-[230px]  md:h-[460px]">
        <Image src="/images/hero-wavy.svg" alt="hero" fill />
      </div>
      <Image
        src="/images/letstalk.svg"
        width={100}
        height={60}
        alt="hero"
        className={`hidden md:block absolute right-[8%] top-[42%] h-10 w-auto cursor-pointer ${hoverAnimation}`}
      />
    </section>
  );
}
