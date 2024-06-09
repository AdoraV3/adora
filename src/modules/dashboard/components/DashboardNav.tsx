"use client";

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

import Link from "next/link";

export function DashboardNav() {
  return (
    <nav className=" sticky md:flex justify-between top-0 z-10 px-6 border-b border-gray-450 pb-4 hidden w-full   bg-white-100 py-4 ">
      <div className="flex w-full items-center justify-end gap-4">
        <Link href="/notification">
          <Icons.Notification className="text-black-100" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Avatar className="size-9">
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
          <DropdownMenuContent className="z-10 w-[22.12rem] py-5 px-3  shadow-[0px_4px_8px_0px_hsla(0,0%,0%,0.1)_0px_-1px_8px_0px_hsla(0,0%,0%,0.1)]">
            <DropdownMenuLabel className="font-satoshi uppercase font-bold text-sm text-gray-2">
              Account
            </DropdownMenuLabel>
            <div className="flex mt-3 mb-5 justify-between px-3 items-center">
              <div className="flex items-center gap-2">
                <Avatar className="size-9">
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
              <DropdownMenuItem className=" text-gray-2 font-satoshi font-normal text-sm">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-2  font-satoshi font-normal text-sm">
                Account Settings
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
              <DropdownMenuItem className="text-gray-2  font-satoshi font-normal text-sm">
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
