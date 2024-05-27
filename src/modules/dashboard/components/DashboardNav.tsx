"use client";

import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import Link from "next/link";

export function DashboardNav() {
  return (
    <nav className=" sticky md:flex justify-between top-0 z-10 px-6 border-b border-gray-450 pb-4 hidden w-full   bg-white-100 py-4 ">
      <div className="flex w-full items-center justify-end gap-4">
        <Link
          href="/dashboard/notification"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "bg-white-200 px-0",
          )}
        >
          <Icons.Notification className="text-gray-100" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center justify-between gap-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt="name" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-satoshi text-sm font-normal text-black-100">
                    Alex Meian
                  </p>
                  <p className="font-satoshi font-normal text-xs  capitalize text-gray-500 ">
                    alex@gmail.com
                  </p>
                </div>
              </div>
              <Icons.ChevronDown className="h-4 w-4 text-black-300 opacity-50" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-10 w-[12.8rem] p-0.5 shadow-500">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>Change Password</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
