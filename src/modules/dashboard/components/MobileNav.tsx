"use client";

import { Icons } from "@/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import * as React from "react";
import { MainNavItem } from "../types";
import { renderSubLinks } from "./Sidebar";
// import { DeleteModal } from "./DeleteModal";

interface MobileNavProps {
  sidebarNavItems: Array<MainNavItem>;
  bottomSidebarItems: Array<MainNavItem>;
  type: "user" | "admin";
}

// interface MobileLinkProps {
//   children?: React.ReactNode;
//   href: string;
//   disabled?: boolean;
//   segment: string;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// function MobileLink({
//   children,
//   href,
//   disabled,
//   segment,
//   setIsOpen,
// }: MobileLinkProps) {
//   return (
//     <Link
//       href={href}
//       className={cn(
//         "text-foreground/70 transition-colors hover:text-foreground",
//         href.includes(segment) && "text-foreground",
//         disabled && "pointer-events-none opacity-60",
//       )}
//       onClick={() => setIsOpen(false)}
//     >
//       {children}
//     </Link>
//   );
// }

export function MobileNav({
  sidebarNavItems,
  bottomSidebarItems,
  type,
}: MobileNavProps) {
  const segment = useSelectedLayoutSegments();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="px-4" asChild>
        <Button
          variant="ghost"
          className="sticky top-0 z-50 mr-2 justify-end bg-white-100 px-4 py-6 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0  md:hidden "
        >
          <Icons.Menu size={26} className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className={cn(
          "bg-white-100 pl-1 pr-0 text-gray-100",
          // type === "admin" && "bg-black-100",
        )}
      >
        <div className="px-7">
          <Link
            href="/"
            className="mb-12 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Icons.Logout />

            {/* <span className="font-bold">{siteConfig.name}</span> */}
            <span className="sr-only">Home</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 ">
          <ul className="pl-1 pr-7">
            {sidebarNavItems?.map(item => {
              const Icon = Icons[item.icon ?? "Dashboard"];
              const isActiveRoute = item?.href?.includes(
                String(segment[type === "admin" ? 0 : 1]),
              );
              const isActiveParentLink = item?.items?.find(el =>
                el.href?.includes(String(segment[1])),
              );
              return (
                <div key={item.title}>
                  {item?.items && item?.items?.length > 0 ? (
                    <Accordion
                      type="multiple"
                      // defaultValue={sidebarItems.map(item => item.title)}
                      className="mb-6 w-full "
                      onClick={() => setIsOpen(false)}
                    >
                      <AccordionItem value={item.title}>
                        <AccordionTrigger
                          className={`flex flex-row justify-between  gap-2  px-4 text-sm capitalize ${
                            isActiveParentLink
                              ? " bg-green-200  text-primary"
                              : ""
                          } `}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={35} />
                            <p
                              className={cn(
                                `font-satoshi text-sm font-normal text-gray-100 ${
                                  isOpen ? "block" : "hidden"
                                }`,
                                // eslint-disable-next-line sonarjs/no-duplicate-string
                                isActiveRoute && "text-primary",
                              )}
                            >
                              {item.title}{" "}
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className={` ml-6 mt-4 flex-col   `}>
                          {renderSubLinks(item)}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      key={item.title}
                      className={cn(
                        "mb-8 flex items-center gap-2  px-4",
                        isActiveRoute && "bg-primary-light py-3 text-primary",
                      )}
                      onClick={() => setIsOpen(false)}
                      href={item.href ?? "/"}
                    >
                      <Icon
                        size={35}
                        className={cn(
                          "text-[#000000]",
                          isActiveRoute && "text-primary ",
                        )}
                      />
                      <p
                        className={cn(
                          `font-satoshi text-sm font-normal text-[#000000] ${
                            isOpen ? "block" : "hidden"
                          }`,
                          isActiveRoute && "text-primary",
                        )}
                      >
                        {item.title}{" "}
                      </p>
                    </Link>
                  )}
                </div>
              );
            })}
            {/* <Accordion
              type="multiple"
              defaultValue={navItems.map(item => item.title)}
              className="w-full"
            >
              {navItems?.map(item => (
                <AccordionItem value={item.title} key={item.title}>
                  <AccordionTrigger className="text-sm capitalize">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {item.items?.map(subItem =>
                        subItem.href ? (
                          <MobileLink
                            key={item.title}
                            href={String(subItem.href)}
                            segment={String(segment)}
                            setIsOpen={setIsOpen}
                            disabled={subItem.disabled}
                          >
                            {subItem.title}
                          </MobileLink>
                        ) : (
                          <div
                            key={item.title}
                            className="text-foreground/70 transition-colors"
                          >
                            {item.title}
                          </div>
                        ),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion> */}
          </ul>

          <ul className="border-t  pt-10 md:mt-20 ">
            {bottomSidebarItems.map(item => {
              // const isActiveRoute = item.href?.includes(path);

              // console.log({ isActiveRoute, segment, href: item.href });
              //   const Icon = Icons[item.icon ?? "Home"];
              return (
                <li key={item.title} className="mb-12 ">
                  {/* {item.isButton ? (
                    <PopUp
                      isOpen={showLogout}
                      buttonText="Log Out"
                      isOpenChange={setShowLogout}
                      handleCancel={() => setShowLogout(!showLogout)}
                      handleClick={handleLogout}
                      // isLoading={deleteHandler.isLoading}
                      title="Log Out"
                      modalTrigger={
                        <Button
                          variant="ghost"
                          className={cn(
                            "flex gap-2  items-center px-4",
                            // isActiveRoute && sidebarClassName[type].container,
                          )}
                        >
                          <Icon
                            size={35}
                            className={cn(
                              "text-gray-100",
                              // isActiveRoute && sidebarClassName[type].icon,
                            )}
                          />
                          <p
                            className={cn(
                              `font-satoshi text-sm font-normal text-gray-100 ${
                                isOpen ? "block" : "hidden"
                              }`,
                              // isActiveRoute && sidebarClassName[type].icon,
                            )}
                          >
                            {item.title}{" "}
                          </p>
                        </Button>
                      }
                    >
                      <div className="text-center">
                        <p className="font-satoshi text-black-200 font-normal text-sm mb-3">
                          Are you sure you want to log out of this account?
                        </p>
                        <p className="text-gray-100 font-normal md:w-3/4 mx-auto text-xs font-satoshi">
                          By logging out, you’ll be required to enter your email
                          and password to access this account again
                        </p>
                      </div>
                    </DeleteModal>
                  ) : (
                    <Link className={cn("w-full")} href={item.href ?? "/"}>
                      <div
                        className={cn(
                          "flex gap-2  items-center px-4",
                          // isActiveRoute && sidebarClassName[type].container,
                        )}
                      >
                        <Icon
                          size={35}
                          className={cn(
                            "text-gray-100",
                            // isActiveRoute && sidebarClassName[type].icon,
                          )}
                        />
                        <p
                          className={cn(
                            `font-satoshi text-sm font-normal text-gray-100 ${
                              isOpen ? "block" : "hidden"
                            }`,
                            // isActiveRoute && sidebarClassName[type].icon,
                          )}
                        >
                          {item.title}{" "}
                        </p>
                      </div>{" "}
                    </Link>
                  )} */}
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
