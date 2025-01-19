"use client";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  MainNavItem,
  NavItem,
  NavItemWithOptionalChildren,
} from "@/modules/dashboard/types";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
// import { useSelectedLayoutSegment } from "next/navigation";
// import { DeleteModal } from "../../commons/components/DeleteModal";
import { logOutAction } from "@/app/actions/auth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import { BOTTOM_SIDEBAR_ITEM } from "@/mock";
import Image from "next/image";
import Link from "next/link";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
  sidebarItems: MainNavItem[];
  bottomSidebarItems: NavItem[];
}

interface RouteLinkProps {
  title: string;
  routeIcon: keyof typeof Icons;

  isOpen: boolean;
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  className?: string;
  disabled?: boolean;
  //   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function RouteLink({ routeIcon, isOpen, title }: RouteLinkProps) {
  const Icon = Icons[routeIcon ?? "Home"];
  return (
    <div className="item-center  flex gap-3">
      <Icon
        // className={cn("text-gray-100", isActive && " text-primary ")}
        size={35}
      />
      <p
        className={cn(
          `whitespace-nowrap font-satoshi text-sm font-normal  ${
            isOpen ? "block" : "hidden"
          }`,
        )}
      >
        {title}{" "}
      </p>
    </div>
  );
}

function MobileLink({ children, href, disabled, className }: MobileLinkProps) {
  const pathname = usePathname();
  return (
    <div className="mb-3 w-full">
      <Link
        href={href}
        className={cn(
          "flex w-full p-2 font-satoshi text-sm font-normal text-foreground/70 transition-colors",
          // eslint-disable-next-line sonarjs/no-duplicate-string
          href === pathname && "rounded-[10px] bg-white-100 text-primary ",
          disabled && "pointer-events-none opacity-60",
          className,
        )}
        // onClick={() => setisActive(true)}
      >
        {children}
      </Link>
    </div>
  );
}

export const renderSubLinks = (
  item: NavItemWithOptionalChildren,
  //   setIsOpen: Dispatch<SetStateAction<boolean>>,
) => {
  return (
    <div>
      {" "}
      {item.items?.map(subItem =>
        subItem.href ? (
          <MobileLink
            key={subItem.title}
            href={String(subItem.href)}
            // setIsOpen={setIsOpen}
            disabled={subItem.disabled}
            // className="text-primary"
          >
            {subItem.title}
          </MobileLink>
        ) : (
          <div
            key={item.title}
            className="py-2 text-foreground/70 transition-colors"
          >
            {subItem.title}
          </div>
        ),
      )}
    </div>
  );
};

export function Sidebar({
  isOpen,
  className,
  sidebarItems,
  bottomSidebarItems,
  setIsOpen,
  ...props
}: Readonly<SidebarNavProps>) {
  // const segment = useSelectedLayoutSegment();
  const segment = useSelectedLayoutSegment();
  //   const router = useRouter();
  //   const [closeLogoutModal, setCloseLogoutModal] = useState(false);

  //   const onLogoutSuccess = () => {
  //     setCloseLogoutModal(false);
  //     router.replace("/admin/login");
  //   };
  //   const logOutHandler = useLogout(onLogoutSuccess);

  const logOutHandler = useServerActionMutation(logOutAction, {});

  return (
    <aside className="scrollbar-hide sticky left-0 top-0 z-30 hidden h-screen w-full bg-brown-200 text-white-100 lg:block">
      <div className="py-6 lg:pt-8">
        <div
          className={cn("flex w-full flex-col gap-2 px-6 ", className)}
          {...props}
        >
          <Image
            src="/images/adora.png"
            className="h-auto w-14"
            width={200}
            height={50}
            alt="logo.png"
          />

          {/* <Icons.Logo isOpen={isOpen} size={48} className="px-4" /> */}
          <Button
            style={{ zIndex: 99999 }}
            variant="ghost"
            onClick={() => setIsOpen?.(!isOpen)}
            className="z-100 absolute -right-5 top-2 mt-6 h-8 w-8 rounded-full bg-white-100 px-2 shadow-sm"
          >
            <Icons.ChevronLeft className="text-black-100" />
          </Button>
          <div className="mt-20 flex flex-col justify-between md:h-[75dvh]">
            <div>
              {sidebarItems?.map(item => {
                const isActiveRoute = item.href?.includes(String(segment));
                const isActiveParentLink = Boolean(
                  item?.items?.find(el => el.href?.includes(String(segment))),
                );

                return (
                  <div
                    className={cn(
                      "",
                      isActiveRoute &&
                        "rounded-[10px] bg-white-100 text-primary ",
                    )}
                    key={item.title}
                  >
                    {item?.items && !!item?.items?.length ? (
                      <Accordion
                        type="single"
                        defaultValue="drafts"
                        className="w-full "
                        collapsible
                      >
                        <AccordionItem
                          className="border-none px-0"
                          value={item.title}
                        >
                          <AccordionTrigger
                            // onClick={() => setIsOpen?.(true)}
                            className={cn(
                              `flex flex-row justify-between gap-2 px-4 py-3  text-sm capitalize text-white-100 ${
                                isActiveParentLink
                                  ? "rounded-[10px] bg-white-100 text-primary "
                                  : ""
                              } `,
                              isOpen && "  ",
                            )}
                            showIcon={isActiveParentLink}
                          >
                            <RouteLink
                              isOpen={isOpen ?? false}
                              routeIcon={item.icon ?? "Dashboard"}
                              title={item.title}
                            />
                          </AccordionTrigger>
                          <AccordionContent
                            className={`ml-3 flex-col py-2 pl-2 ${
                              !isOpen && "hidden"
                            }  `}
                          >
                            {renderSubLinks(item)}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <Link
                        key={item.title}
                        className={cn(
                          "mb-4 flex justify-between px-3 py-3",
                          isActiveRoute && "rounded-[10px]   text-primary",
                          // !isOpen && "px-4",
                        )}
                        href={item.href ?? "/"}
                      >
                        <RouteLink
                          isOpen={isOpen ?? false}
                          routeIcon={item.icon ?? "Dashboard"}
                          title={item.title}
                        />
                        {/* <p
                        className={cn(
                          "min-h-6 min-w-4 flex items-center justify-center rounded-[6px] bg-[hsla(4,91%,58%,1)] px-3 py-2 font-satoshi text-sm font-medium text-white-100",
                          isOpen ? "block" : "hidden",
                        )}
                      >
                        3
                      </p> */}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {BOTTOM_SIDEBAR_ITEM?.map(item => {
              const Icon = Icons[item.icon ?? "Dashboard"];
              const isActiveRoute = item.href?.includes(String(segment));

              return (
                <div className="bg-brown-200 opacity-20" key={item.title}>
                  {item.isButton ? (
                    <button
                      onClick={() => logOutHandler.mutate(undefined)}
                      type="button"
                      className="flex  cursor-pointer gap-2 px-4 py-3 hover:bg-[hsla(25,64%,36%,0.25)]"
                    >
                      <Icon
                        size={35}
                        className={cn("text-[hsla(229,18%,64%,1)]")}
                      />
                      <p
                        className={cn(
                          `font-sfPro text-gray-350 text-sm  font-normal ${
                            isOpen ? "block" : "hidden"
                          }`,
                        )}
                      >
                        Log out
                      </p>
                    </button>
                  ) : (
                    <Link
                      key={item.title}
                      className={cn(
                        "my-5 flex items-center gap-2  px-4",
                        isActiveRoute &&
                          "rounded-[10px]  bg-[hsla(210,13%,97%,0.5)] py-3 text-black-100",
                      )}
                      href={item.href ?? "/"}
                    >
                      <Icon
                        size={18}
                        className={cn(
                          "text-gray-350",
                          isActiveRoute &&
                            "bg-[hsla(210,13%,97%,0.5)] text-black-100",
                        )}
                      />
                      <p
                        className={cn(
                          `font-sfPro text-gray-350 text-base font-medium ${
                            isOpen ? "block" : "hidden"
                          }`,
                          isActiveRoute &&
                            "bg-[hsla(210,13%,97%,0.5)] text-black-100",
                        )}
                      >
                        Link
                      </p>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
