"use client";

import { RecentCallLogs } from "@/modules/call-logs/components/RecentCallLogs";
import { AiInfo } from "../components/AiInfo";

export function Home() {
  // const updateUserHandler = useServerActionMutation(updatePreferenceAction, {});
  return (
    <section className="bg-[hsla(0,0%,100%,0.34)] flex flex-col gap-6 ">
      <div className="flex justify-between">
        <h2 className="font-satoshi font-medium text-2xl text-black-100">
          Overview
        </h2>

        {/* <Select>
          <SelectTrigger className="w-[120px] border-none bg-white-100">
            <SelectValue placeholder="Days" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Last 30Days</SelectItem>
            <SelectItem value="dark">Last Week</SelectItem>
            <SelectItem value="system">Yesterday</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      {/* <div className="divide-x-1 grid divide-[hsla(0,0%,85%,1)]  md:grid-cols-4">
        <OverviewCard
          iconBackground="bg-[hsla(285,62%,75%,1)] "
          icon="Expand"
          title="Total Interactions"
          value={5000}
          impression={
            <div className="mt-2 flex items-center gap-2">
              <Icons.ArrowRightUp className="text-green-100" />
              <p className="font-satoshi text-[10px] font-normal text-black-100 ">
                12% increase from last month
              </p>
            </div>
          }
        />
        <OverviewCard
          iconBackground="bg-[hsla(215,70%,67%,1)] "
          icon="HeartRate"
          title="Resolution Rate"
          value="85%"
          impression={
            <div className="mt-2 flex items-center gap-2">
              <Icons.ArrowRightDown className="text-red-100" />
              <p className="font-satoshi text-[10px] font-normal text-black-100 ">
                10% decrease from last month
              </p>
            </div>
          }
        />
        <OverviewCard
          iconBackground="bg-[hsla(17,72%,68%,1)] "
          icon="Time"
          title="Average Resolution Time"
          value="2 minutes"
          impression={
            <div className="mt-2 flex items-center gap-2">
              <Icons.ArrowRightUp className="!text-green-100" />
              <p className="font-satoshi text-[10px] font-normal text-black-100 ">
                12% increase from last month
              </p>
            </div>
          }
        />
        <OverviewCard
          iconBackground="bg-[hsla(130,48%,72%,1)] "
          icon="Chart"
          title="Customer Satisfaction Rating"
          value="2 minutes"
        />
      </div> */}

      <AiInfo />
      {/* <Activities /> */}
      <div className="space-y-3">
        <h6 className="font-medium text-xl text-black-100">Recent Call Logs</h6>
        <RecentCallLogs type="recent" />
      </div>
    </section>
  );
}
