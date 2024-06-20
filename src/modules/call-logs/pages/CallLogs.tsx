"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryParams } from "@/modules/commons/hooks/useQueryParams";
import Link from "next/link";
import { RecentCallLogs } from "../components/RecentCallLogs";

export function CallLogs() {
  const { queryParams } = useQueryParams();
  const activeTab = queryParams.get("tab") ?? "recent";
  return (
    <Tabs defaultValue={activeTab} className="w-full  py-5 ">
      <TabsList className="bg-[hsla(0,0%,96%,1)] md:h-[3rem] ">
        <TabsTrigger
          className="font-medium rounded-md py-3  text-sm font-satoshi  data-[state=active]:border-none data-[state=active]:bg-white-100"
          value="recent"
        >
          <Link className="w-full" href="?tab=recent">
            RECENT CALL LOGS
          </Link>
        </TabsTrigger>
        <TabsTrigger
          className="font-medium rounded-md py-3 text-sm bg-[hsla(0,0%,96%,1)] font-satoshi  data-[state=active]:border-none data-[state=active]:bg-white-100"
          value="past"
        >
          <Link className="w-full" href="?tab=past">
            PAST CALL LOGS
          </Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="recent">
        <RecentCallLogs />
      </TabsContent>
      <TabsContent value="past">
        <RecentCallLogs />{" "}
      </TabsContent>
    </Tabs>
  );
}
