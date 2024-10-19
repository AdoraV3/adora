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
      <div className="mx-6 flex flex-col justify-between bg-gradient-to-r from-gray-50 to-gray-200 md:mx-8 md:flex-row">
        {/* Left Section */}
        <div className="mb-6 text-center md:mb-0 md:w-[50%] md:text-left">
          <h4 className="text-sm font-medium text-gray-500">
            Adora: Customer Service AI Agent
          </h4>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">
            Revolutionize Your <br /> Customer Experience.
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center space-y-4 md:w-[40%] md:items-start">
          <p className="max-w-xs text-center text-sm text-gray-700 md:text-left">
            Enhance Your Service with AI-Powered, Real-Time, Human-Like
            Conversations. Your Premier Solution for Customer Support & Inbound
            Call Automation.
          </p>
          <button className="hover:bg-brown-600 rounded-2xl bg-[#975221] px-5 py-3 text-sm text-[#ffff] transition">
            Get Started for Free →
          </button>

          {/* Small round image for "Let's Talk" */}
          <Image
            src="/images/letstalk.svg"
            width={100}
            height={60}
            alt="hero"
            className={`ml-auto hidden h-10 w-auto cursor-pointer md:block ${hoverAnimation}`}
          />
        </div>
      </div>

      <div className="mx-auto animate-pulse mt-20">
        <Image
          src="/images/mic.png"
          width={100}
          height={60}
          alt="hero"
          className={`mx-auto h-[180px] w-auto cursor-pointer rounded-2xl object-cover ${hoverAnimation}`}
        />
      </div>
      <div className="flex flex-col ">
        <button
          className={`hover:bg-brown-600 mx-auto my-10 w-fit rounded-lg border border-[#975221] bg-[#fff] px-5 py-3 text-sm text-[#975221] transition ${hoverAnimation}`}
        >
          Speak with the mic!
        </button>
        <button
          className={`hover:bg-brown-600 mx-auto w-fit rounded-lg bg-[#975221] px-10 py-3 text-sm text-[#ffff] transition md:px-32 ${hoverAnimation}`}
        >
          Try demo for free
        </button>
      </div>
      {/* <div className="flex flex-col items-center px-4 md:px-20">
        <h1 className="mb-3 flex flex-row flex-wrap  items-center gap-3 text-center  font-coreC text-2xl  font-normal tracking-tight text-black-100 md:text-5xl">
          <span className="hidden bg-gradient-to-b from-black-100 to-primary bg-clip-text text-transparent  md:block">
            AI{" "}
          </span>{" "}
          <span className="md:hidden">AI</span> Customer Support Solutions For{" "}
          <WordRotate words={words} />
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
      </div> */}

      {/* <div className=" relative h-[230px]  md:h-[460px]">
        <Image src="/images/hero-wavy.svg" alt="hero" fill />
      </div> */}
      {/* <Image
        src="/images/letstalk.svg"
        width={100}
        height={60}
        alt="hero"
        className={`absolute right-[8%] top-[25%] hidden h-10 w-auto cursor-pointer md:block ${hoverAnimation}`}
      /> */}
      <div className="mx-auto mt-20">
        <Image
          src="/images/hero.svg"
          width={100}
          height={60}
          alt="hero"
          className={`mx-auto h-[500px] w-[90%] rounded-2xl object-cover`}
        />
      </div>
    </section>
  );
}
