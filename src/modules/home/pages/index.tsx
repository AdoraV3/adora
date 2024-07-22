"use client";

import { Icons } from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiInfo } from "../components/AiInfo";
import { OverviewCard } from "../components/OverviewCard";
import { RecentCalls } from "../components/RecentCalls";

export function Home() {
  // const updateUserHandler = useServerActionMutation(updatePreferenceAction, {});
  return (
    <section className="bg-[hsla(0, 0%, 100%,0.34)] ">
      <div className="flex mt-10 justify-between">
        <h2 className="font-satoshi font-medium text-2xl text-black-100">
          Overview
        </h2>

        <Select>
          <SelectTrigger className="w-[120px] bg-white-100 border-none">
            <SelectValue placeholder="Days" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Last 30Days</SelectItem>
            <SelectItem value="dark">Last Week</SelectItem>
            <SelectItem value="system">Yesterday</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="md:grid-cols-4 grid divide-x-1  divide-[hsla(0,0%,85%,1)]">
        <OverviewCard
          iconBackground="bg-[hsla(285,62%,75%,1)] "
          icon="Expand"
          title="Total Interactions"
          value={5000}
          impression={
            <div className="flex gap-2 mt-2 items-center">
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
            <div className="flex gap-2 mt-2 items-center">
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
            <div className="flex gap-2 mt-2 items-center">
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
      </div>

      <AiInfo />
      {/* <Activities /> */}

      <RecentCalls />
    </section>
  );
}
