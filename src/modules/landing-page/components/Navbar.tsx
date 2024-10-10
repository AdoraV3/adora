"use client";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAVBAR_ITEMS } from "@/mock";
import { useGetLocation } from "@/modules/commons/hooks/useGetLocation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  useGetLocation();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="py-4 sticky bg-white-100 z-20 top-0 ">
        <header
          className={`flex justify-between bg-white-100 shadow-[0px_6px_30px_6px_hsla(0,0%,0%,0.05)] mx-4 md:mx-16  rounded-[20px] py-3   items-center  px-4 md:px-12 `}
        >
          <div className="flex gap-16 w-full  items-center">
            <div>
              <Link className="flex gap-3 items-center" href="/">
                <Image src={"/images/adoralogo.png"} className="w-full h-10" width={200} height={50} />
              </Link>
            </div>

            <ul className="md:flex hidden relative font-gotham text-base font-normal text-[#575757] items-center gap-8">
              {NAVBAR_ITEMS?.map(el => {
                return (
                  <div key={el.title}>
                    <Link
                      className={cn(
                        "font-normal font-satoshi text-lg text-center text-[#575757]",
                        {
                          "text-primary font-bold": pathname === el.href,
                        },
                      )}
                      href={el.href ?? "/"}
                    >
                      {el.title}
                    </Link>
                  </div>
                );
              })}
            </ul>
          </div>

          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base flex flex-end hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
            >
              <Icons.Menu className="h-6 w-6 text-primary" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

          <div className=" hidden lg:flex gap-3">
            <Link
              href="/login"
              className={cn(
                "text-primary font-satoshi font-normal text-base",
                buttonVariants({ variant: "outline", size: "sm" }),
              )}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "text-white-100 px-10 bg-brown-200 whitespace-nowrap font-satoshi",
              )}
            >
              Start free trial
            </Link>
          </div>
        </header>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 md:hidden" />
      )}

      <SheetContent
        side="right"
        className="pl-1 pr-0 bg-white-100 text-[#575757]"
      >
        <div className="px-7">
          <Link
            aria-label="Home"
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <span className="">
              {" "}
              <Link href="/">
                <Image src={"/images/adoralogo.png"} className="w-full h-10" width={200} height={50} />
              </Link>
            </span>
          </Link>
        </div>
        <ScrollArea className="my-4 pb-10 pl-6">
          <ul className="pl-1 flex flex-col space-y-6 justify-center mt-10 pr-7">
            {NAVBAR_ITEMS?.map(el => {
              return (
                <li key={el.title}>
                  <Link
                    className="font-normal font-satoshi text-lg text-[#575757] hover:text-2xl"
                    href={el.href ?? "/"}
                    onClick={() => setIsOpen(false)}
                  >
                    {el.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
