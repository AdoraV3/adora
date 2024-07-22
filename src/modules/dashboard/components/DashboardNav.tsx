"use client";

import { logOut } from "@/app/actions/auth";
import { getUserAction } from "@/app/actions/user";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useServerActionQuery } from "@/lib/hooks/server-action-hooks";
import { DynamicBreadcrumb } from "@/modules/commons/components";
import { getInitials } from "@/modules/commons/utils/helpers";

import Link from "next/link";

export function DashboardNav() {
  const { data: queryData } = useServerActionQuery(getUserAction, {
    input: undefined,
    queryKey: ["getUser"],
  });

  const user = queryData?.data;
  return (
    <nav className=" sticky px-6 md:flex  items-center justify-between top-0 z-10   border-b border-gray-450 pb-4 hidden w-full   bg-white-100 ">
      <DynamicBreadcrumb
        activeClasses="text-black-100"
        homeElement="Menu"
        separator="/"
        capitalizeLinks
        listClasses="font-satoshi text-gray-550 text-sm font-normal"
      />
      <p className="font-satoshi text-gray-550   text-sm font-medium">
        Agent Number:
        <span className="font-bold text-sm text-blue-300 ml-2">
          012-333-444
        </span>{" "}
      </p>
      <div className="flex gap-4 items-center">
        <Link href="/notification">
          <Icons.Notification className="text-black-100" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Avatar className="size-9">
                  <AvatarImage src={user?.profile?.avatar ?? ""} alt="name" />
                  <AvatarFallback>
                    {getInitials(user?.profile?.name)}{" "}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-satoshi text-sm font-normal text-black-100">
                    {user?.profile?.name}
                  </p>
                  <p className="font-satoshi font-normal text-xs  text-gray-500 ">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Icons.ChevronDown className="h-4 w-4 text-black-300 opacity-50" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-10 w-[22.12rem] py-5 px-3  shadow-[0px_4px_8px_0px_hsla(0,0%,0%,0.1)_0px_-1px_8px_0px_hsla(0,0%,0%,0.1)]">
            <DropdownMenuLabel className="font-satoshi uppercase font-bold text-sm text-gray-2">
              Account
            </DropdownMenuLabel>
            <div className="flex mt-3 mb-5 justify-between px-3 items-center">
              <div className="flex items-center gap-2">
                <Avatar className="size-9">
                  <AvatarImage src={user?.profile?.avatar ?? ""} alt="name" />
                  <AvatarFallback>
                    {" "}
                    {getInitials(user?.profile?.name ?? "")}{" "}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-satoshi text-sm font-normal capitalize text-black-100">
                    {user?.profile?.name}
                  </p>
                  <p className="font-satoshi font-normal text-xs text-gray-500 ">
                    {user?.email}
                  </p>
                </div>
              </div>

              <Badge className="bg-blue-200 rounded-md text-white-100">
                Pro plan{" "}
              </Badge>
            </div>

            <div className="flex justify-between px-3 mb-3 items-center">
              <p className="font-satoshi font-normal text-sm text-primary">
                Upgrade Plan
              </p>

              <Icons.Upload className="text-primary" />
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuGroup className="pt-2 space-y-2">
              <DropdownMenuItem
                asChild
                className="text-gray-2 font-satoshi font-normal text-sm"
              >
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-2  font-satoshi font-normal text-sm">
                <Link href="/account-settings">Account Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-2  font-satoshi font-normal text-sm">
                Selected agents
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-2  font-satoshi font-normal text-sm">
                Selected voice
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuGroup className="pt-2 space-y-2">
              <DropdownMenuItem className=" text-gray-2 font-satoshi font-normal text-sm">
                Help
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => logOut()}
                className="text-gray-2  font-satoshi font-normal text-sm"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
