import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { hoverAnimation, hoverFooterAnimation } from "@/utils/animations";

export function Footer() {
  return (
    <footer className="pb-6">
      <div className="grid py-10 px-4 md:px-12 gap-10 border-t border-[hsla(0,0%,0%,0.1)] md:grid-cols-3">
        <div>
          <div className="flex flex-col gap-1">
              
              <Image src={"/images/adoralogo.png"} className="-ml-3 w-32 h-10" width={200} height={50} />

             
            <div className="flex flex-row mt-10 gap-4 items-center">
              <FaFacebook size={28} className={hoverFooterAnimation} />
              <CiTwitter size={28} className={hoverFooterAnimation} />
              <FaLinkedin size={28} className={hoverFooterAnimation} />
              <FaInstagram size={28} className={hoverFooterAnimation} />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h6 className="text-[#1C1C1C] font-satoshi font-bold text-base">
            Home
          </h6>

          <p className="font-satoshi font-normal text-base text-[#575757]">
            Pricing
          </p>
          <p className="font-satoshi font-normal text-base text-[#575757]">
            About Us
          </p>
          <p className="font-satoshi font-normal text-base text-[#575757]">
            Legal
          </p>
        </div>
        <div className="space-y-3">
          <h6 className="text-[#1C1C1C] font-satoshi font-bold text-base">
            Contact us
          </h6>
          <p className="font-satoshi font-normal text-base text-[#575757]">
            734 States Street Mississauga Ontario Canada.
          </p>
          <p className="font-satoshi font-normal text-base text-[#575757]">
            noreply@poulina.io
          </p>
          <p className="font-satoshi font-normal text-base text-[#575757]">
            3065510212
          </p>
        </div>
      </div>

      <p className="text-center font-normal text-xs text-[#575757] font-satoshi">
        © {new Date().getFullYear()} Adora. All Rights Reserved.
      </p>
    </footer>
  );
}
