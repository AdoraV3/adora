"use client";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  MainNavItem,
  NavItem,
  NavItemWithOptionalChildren,
} from "@/modules/dashboard/types";
import { useSelectedLayoutSegments } from "next/navigation";
// import { useSelectedLayoutSegment } from "next/navigation";
// import { DeleteModal } from "../../commons/components/DeleteModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  isActive: boolean;
  isOpen: boolean;
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  className?: string;
  disabled?: boolean;
  //   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function RouteLink({ isActive, routeIcon, isOpen, title }: RouteLinkProps) {
  const Icon = Icons[routeIcon ?? "Home"];
  return (
    <div className="item-center flex gap-3">
      <Icon
        className={cn("text-gray-100", isActive && " text-primary ")}
        size={35}
      />
      <p
        className={cn(
          `whitespace-nowrap font-satoshi text-sm font-normal text-white-100 ${
            isOpen ? "block" : "hidden"
          }`,
          isActive && " text-white-100 ",
        )}
      >
        {title}{" "}
      </p>
    </div>
  );
}

function MobileLink({ children, href, disabled, className }: MobileLinkProps) {
  const segments = useSelectedLayoutSegments();
  return (
    <div className="mb-3 w-full">
      <Link
        href={href}
        className={cn(
          "flex w-full  p-2 font-satoshi text-xs font-semibold text-foreground/70  transition-colors hover:text-foreground",
          href.includes(segments[0]) && "bg-[hsla(0,2%,8%,1)] text-primary ",
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
}: SidebarNavProps) {
  // const segment = useSelectedLayoutSegment();
  const segment = useSelectedLayoutSegments();
  //   const router = useRouter();
  //   const [closeLogoutModal, setCloseLogoutModal] = useState(false);

  //   const onLogoutSuccess = () => {
  //     setCloseLogoutModal(false);
  //     router.replace("/admin/login");
  //   };
  //   const logOutHandler = useLogout(onLogoutSuccess);

  return (
    <aside className="scrollbar-hide sticky left-0 top-0 z-30 hidden h-screen w-full bg-brown-200 text-white-100 lg:block">
      <div className="py-6 lg:py-8">
        <div
          className={cn("flex w-full flex-col gap-2 px-6 ", className)}
          {...props}
        >
          {/* <Icons.Logo isOpen={isOpen} size={48} className="px-4" /> */}
          <Button
            style={{ zIndex: 99999 }}
            variant="ghost"
            onClick={() => setIsOpen?.(!isOpen)}
            className="z-100 absolute rounded-full -right-5 top-10 mt-6 h-8 w-8 bg-white-100 px-2 shadow-sm"
          >
            <Icons.ChevronLeft className="text-black-100" />
          </Button>
          <div className="mt-20 flex flex-col justify-between md:h-[75dvh]">
            <div>
              {sidebarItems?.map(item => {
                const isActiveRoute = item.href?.includes(String(segment[0]));
                const isActiveParentLink = Boolean(
                  item?.items?.find(el =>
                    el.href?.includes(String(segment[0])),
                  ),
                );

                return (
                  <div key={item.title}>
                    {item?.items && item?.items?.length > 0 ? (
                      <Accordion
                        type="single"
                        defaultValue="drafts"
                        className="mb-1 w-full "
                        collapsible
                      >
                        <AccordionItem value={item.title}>
                          <AccordionTrigger
                            // onClick={() => setIsOpen?.(true)}
                            className={cn(
                              `flex flex-row justify-between  gap-2  px-4 text-sm capitalize ${
                                isActiveParentLink ? " py-3 text-primary " : ""
                              } `,
                              isOpen && "bg-[hsla(0,2%,8%,1)]",
                            )}
                          >
                            <RouteLink
                              isOpen={isOpen ?? false}
                              isActive={isActiveParentLink}
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
                          "mb-8 flex justify-between px-3",
                          isActiveRoute && "rounded-lg py-3 text-primary",
                          !isOpen && "px-4",
                        )}
                        href={item.href ?? "/"}
                      >
                        <RouteLink
                          isOpen={isOpen ?? false}
                          isActive={isActiveRoute ?? false}
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
            {/* <PopUp
              isOpen={closeLogoutModal}
              isOpenChange={setCloseLogoutModal}
              title=" Are you sure you want to log out?"
              description={
                "By logging out, You'll not be able to take further actions on the admin panel."
              }
              handleConfirm={() => logOutHandler.mutate()}
              isLoading={logOutHandler.isPending}
              variant="error"
              modalTrigger={
                <Button
                  variant="ghost"
                  className={cn(
                    `flex items-center ${
                      !isOpen ? "justify-center" : "justify-start"
                    }  gap-3 px-0`,
                  )}
                >
                  <Icons.Logout size={35} className={cn("text-gray-100")} />
                  <p
                    className={cn(
                      `font-Satoshi text-base font-medium text-gray-100 ${
                        isOpen ? "block" : "hidden"
                      }`,
                    )}
                  >
                    Log out
                  </p>
                </Button>
              }
            /> */}
          </div>
        </div>
      </div>
    </aside>
  );
}
