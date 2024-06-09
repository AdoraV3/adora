import { Icons } from "@/components/icons";

export function Footer() {
  return (
    <footer>
      <div className="grid py-20 gap-10 border-t border-[hsla(0,0%,0%,0.1)] md:grid-cols-3">
        <div>
          <div className="flex gap-1">
            <Icons.Logo />
            <p className="font-bold text-4xl text-black-100 font-urbanist">
              Adora
            </p>
            <div className="flex mt-10 gap-2 items-center">
              <Icons.Facebook />
              <Icons.Twitter />
              <Icons.LinkedIn />
              <Icons.Instagram />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h6 className="text-black-100 font-satoshi font-bold text-base">
            Home
          </h6>

          <p className="font-satoshi font-normal text-base text-black-100">
            Pricing
          </p>
          <p className="font-satoshi font-normal text-base text-black-100">
            About Us
          </p>
          <p className="font-satoshi font-normal text-base text-black-100">
            Legal
          </p>
        </div>
        <div>
          <h6 className="text-black-100 font-satoshi font-bold text-base">
            Contact us
          </h6>
          <p className="font-satoshi font-normal text-base text-black-100">
            734 States Street Mississauga Ontario Canada.
          </p>
          <p className="font-satoshi font-normal text-base text-black-100">
            noreply@poulina.io
          </p>
          <p className="font-satoshi font-normal text-base text-black-100">
            3065510212
          </p>
        </div>
      </div>

      <p className="text-center font-normal text-xs text-black-100 font-satoshi">
        © {new Date().getFullYear()} Adora. All Rights Reserved.
      </p>
    </footer>
  );
}
