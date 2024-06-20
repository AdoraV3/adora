"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/modules/commons/components";
import { Pagination } from "@/modules/commons/components/Pagination";
import { SearchInput } from "@/modules/commons/components/SearchInput";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export function OutboundCalls() {
  const data = [
    {
      id: 1,
      name: "Bola Johnson",
      number: "08012345678",
      date: "Jan-12-24",
      time: "8:00 am",
      callCycle: 2,
    },
    {
      id: 2,
      name: "Craig David",
      date: "Jan-12-24",
      time: "8:00 am",
      number: "08012345678",
      callCycle: 3,
    },
    {
      id: 3,
      name: "John Doe",
      date: "Jan-12-24",
      time: "8:00 am",
      number: "08012345678",
      callCycle: 4,
    },
    {
      id: 4,
      name: "Sadio Mane",
      date: "Jan-12-24",
      time: "8:00 am",
      number: "08012345678",
      callCycle: 20,
    },
    {
      id: 5,
      name: "David Luiz",
      number: "08012345678",
      date: "Jan-12-24",
      time: "8:00 am",
      callCycle: 0,
    },
  ];
  const columns = useMemo(() => {
    return [
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "time",
        header: "Time",
      },
      {
        accessorKey: "name",
        header: "Name & Number",
        cell: () => {
          return (
            <div>
              <p className="mb-2 font-satoshi text-sm font-normal">
                Ola Johnson
              </p>
              <p className="font-satoshi text-sm font-normal">08011122233</p>
            </div>
          );
        },
      },
      {
        accessorKey: "callCycle",
        header: "Call Cycle",
      },
    ];
  }, []);

  const router = useRouter();
  return (
    <section className="mt-10 max-w-3xl">
      <div className="justify-between mb-5 flex items-center">
        <SearchInput
          className="w-[19.5rem] rounded-md border !border-[hsla(0,0%,2%,0.2)] h-10 "
          placeholder="Search by date or number ..."
          type="search"
        />
        <Button
          className="font-normal text-xs"
          size="sm"
          icon={<Icons.Add />}
          onClick={() => router.push("/outbound-calls/add")}
        >
          Add New Outbound call
        </Button>
      </div>
      <DataTable
        // containerClassName="my-20 max-w-3xl"
        // headerClassName="text-center"
        data={data}
        columns={columns}
        tableRowClassName="text-[hsla(0,1%,38%,1)] "
      />

      <Pagination totalDocs={20} totalPageCount={4} />
    </section>
  );
}
