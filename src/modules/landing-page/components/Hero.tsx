"use client";

import { hoverAnimation } from "@/utils/animations";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useVapiCall } from "../hooks/useVapiWebCall";

export function Hero() {
  const router = useRouter();

  const { toggleCall, isCallActive } = useVapiCall();

  return (
    <section className="relative w-full pt-10">
      <div className="mx-6 flex flex-col justify-between bg-gradient-to-r from-gray-50 to-gray-200 md:mx-8 md:flex-row lg:mx-12">
        {/* Left Section */}
        <div className="mb-6 text-center md:mb-0 md:w-[50%] md:text-left">
          <h4 className="text-sm font-medium text-gray-500">
            Adora: Customer Service AI Agent
          </h4>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">
            Revolutionize Your <br /> Customer Experience
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center space-y-4 md:w-[40%] md:items-start">
          <p className="max-w-xs text-center text-sm text-[#575757] md:text-left">
            Enhance your service with AI-powered, real-time, human-like
            conversations. Your premier solution for customer support & inbound
            call automation.
          </p>
          <button
            onClick={() => router.push("/register")}
            type="button"
            className="hover:bg-brown-600 rounded-lg bg-[#975221] px-5 py-3 text-sm text-[#ffff] transition"
          >
            Get Started for Free →
          </button>

          {/* Small round image for "Let's Talk" */}
          <Image
            src="/images/letstalk.svg"
            width={100}
            height={60}
            onClick={() => router.push("/contact-us")}
            alt="hero"
            className={`ml-auto hidden h-10 w-auto cursor-pointer md:block ${hoverAnimation}`}
          />
        </div>
      </div>

      {/* Images cards */}
      <div className="relative mx-8 mt-6 flex flex-col gap-4 md:mx-10 md:flex-row md:items-center lg:mx-12">
        <Image
          src="/images/heromain.svg"
          width={800}
          height={800}
          alt="hero"
          className="h-full w-full rounded-2xl object-cover"
        />
      </div>
      {/* <div className="relative mt-6 mx-8 flex flex-col gap-4 md:mx-10 md:flex-row md:items-center lg:mx-12">
        <div className="w-auto md:h-[480px] md:w-[60%]">
          <Image
            src="/images/hero1.png"
            width={800}
            height={800}
            alt="hero"
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>

        <div className="flex flex-col justify-between md:h-[480px] md:w-[38%]">
          <Image
            src="/images/hero2.png"
            width={800}
            height={800}
            alt="hero"
            className={`h-[75%] w-full rounded-2xl object-cover `}
          />
          <div className="relative z-10 mt-4 h-[20%] w-full">
            <Image
              src="/images/blurhero.png"
              width={800}
              height={800}
              alt="hero"
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="absolute left-[15%] right-[15%] top-6 z-20 flex flex-row items-center justify-between">
              <button
                type="button"
                className={`flex cursor-pointer flex-row items-center gap-x-3 rounded-full bg-[#ffffff] px-8 py-3 ${hoverAnimation}`}
                onClick={() => router.push("/register")}
              >
                <p>Sign up</p>
                <p>&rarr;</p>
              </button>
              <button
                type="button"
                className={`flex cursor-pointer flex-row items-center gap-x-3 rounded-full border bg-[#ffffff00] px-8 py-3 ${hoverAnimation}`}
                onClick={() => router.push("/login")}
              >
                <p>Login</p>
                <p>&rarr;</p>
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="mx-auto mt-20">
        <Image
          onClick={toggleCall}
          src="/images/mic.png"
          width={100}
          height={60}
          alt="hero"
          className={`mx-auto h-[180px] w-auto cursor-pointer rounded-2xl object-cover ${hoverAnimation}`}
        />
      </div>
      <div className="flex flex-col ">
        {isCallActive ? (
          <button
            onClick={toggleCall}
            type="button"
            className={`hover:bg-brown-600 mx-auto mt-10 mb-6 w-fit rounded-lg border border-[#975221] bg-[#fff] px-5 py-3 text-sm text-[#975221] transition ${hoverAnimation}`}
          >
            End call
          </button>
        ) : (
          <p className="mx-auto mb-2 mt-6 text-center text-sm font-thin text-[#000000]">
            Tap on the microphone to speak
          </p>
        )}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className={`hover:bg-brown-600 mx-auto w-fit rounded-lg bg-[#975221] px-10 py-3 text-sm text-[#ffff] transition md:px-32 ${hoverAnimation}`}
        >
          Try demo for free
        </button>
      </div>
    </section>
  );
}
