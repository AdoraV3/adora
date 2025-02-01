"use client";

import { hoverFooterAnimation } from "@/utils/animations";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();
  return (
    <footer className="pb-6">
      <div className="grid py-10 px-4 md:px-12 gap-10 border-t border-[hsla(0,0%,0%,0.1)] md:grid-cols-3">
        <div>
          <div className="flex flex-col gap-1">
            <Image
              src="/images/adoralogo.png"
              className="-ml-3 w-32 h-10"
              width={200}
              height={50}
              alt="logo.png"
            />

            <div className="flex flex-row mt-10 gap-4 items-center">
              <Facebook size={28} className={hoverFooterAnimation} />
              <Twitter size={28} className={hoverFooterAnimation} />
              <Linkedin size={28} className={hoverFooterAnimation} />
              <Instagram size={28} className={hoverFooterAnimation} />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h6 className="text-[#1C1C1C] font-satoshi font-bold text-base">
            Links
          </h6>

          <div className="flex flex-col space-y-4 ">
            <button
              type="button"
              className="bg-none hover:scale-95 text-left font-satoshi font-normal text-base text-black-100 cursor-pointer"
              onClick={() => router.push("/pricing")}
            >
              Pricing
            </button>
            <button
              type="button"
              className="bg-none hover:scale-95 text-left font-satoshi font-normal text-base text-black-100 cursor-pointer"
              onClick={() => router.push("/about")}
            >
              About us
            </button>
            <button
              type="button"
              className="bg-none hover:scale-95 text-left font-satoshi font-normal text-base text-black-100 cursor-pointer"
              onClick={() => router.push("/privacy")}
            >
              Legal
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <h6 className="text-[#1C1C1C] font-satoshi font-bold text-base">
            Contact us
          </h6>
          <p className="font-satoshi font-normal text-base text-black-100">
            734 States Street Mississauga,
            <br /> Ontario Canada.
          </p>
          <p className="font-satoshi font-normal text-base text-black-100">
            info@adora3.com
          </p>
          <p className="font-satoshi font-normal text-base text-black-100">
            +1 (306) 551-0212
          </p>
        </div>
      </div>

      <p className="text-center font-normal text-xs text-black-100 font-satoshi">
        © {new Date().getFullYear()} Adora. All Rights Reserved.
      </p>
    </footer>
  );
}
