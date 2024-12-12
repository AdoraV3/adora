"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/modules/commons/components";
import { Pagination } from "@/modules/commons/components/Pagination";
import { SearchInput } from "@/modules/commons/components/SearchInput";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export function Appointment() {
  const data = [
    {
      id: 1,
      date: "Jan-12-24",
      time: "8:00 am",
      type: "Zoom",
      meeting: "Mr. John, Google Company",
      conversion: "Hi there, I'm having trouble. Every time I get to the checkout ..."
    },
    {
      id: 2,
      date: "Jan-12-24",
      time: "8:00 am",
      type: "Zoom",
      meeting: "Mr. John, Google Company",
      conversion: "Hi there, I'm having trouble. Every time I get to the checkout ..."
    },
    {
      id: 3,
      date: "Jan-12-24",
      time: "8:00 am",
      type: "Zoom",
      meeting: "Mr. John, Google Company",
      conversion: "Hi there, I'm having trouble. Every time I get to the checkout ..."
    },
    {
      id: 4,
      date: "Jan-12-24",
      time: "8:00 am",
      type: "Zoom",
      meeting: "Mr. John, Google Company",
      conversion: "Hi there, I'm having trouble. Every time I get to the checkout ..."
    },
    {
      id: 5,
      date: "Jan-12-24",
      time: "8:00 am",
      type: "Zoom",
      meeting: "Mr. John, Google Company",
      conversion: "Hi there, I'm having trouble. Every time I get to the checkout ..."
    }
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
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "meeting",
        header: "Meeting with",
      },
      {
        accessorKey: "conversion",
        header: "Conversion Audio",
      },
    ];
  }, []);

  const router = useRouter();
  return (
    <section className="mt-10 max-w-4xl">
      <h5 className="text-xl">Appointment Scheduler</h5>
      <p className="text-sm text-[#1c1c1c80]">
        Input your appointment link for meeting scheduling
      </p>
      <h5 className="text-md text-[#1c1c1c] mt-8 font-light">Appointment link</h5>
      <Input
        className="!h-24 rounded-xl border border-[#8E8E93] bg-white-100"
        placeholder=""
      />
      <div className="flex w-full flex-col">
        <Button
          className="mx-auto my-10 min-w-[50%] text-xs font-normal"
          onClick={() => {}}
        >
          Submit{" "}
        </Button>

        <div className="mb-5 flex items-center justify-between">
          <SearchInput
            className="h-10 w-[19.5rem] rounded-md border !border-[hsla(0,0%,2%,0.2)] "
            placeholder="Search by date or type..."
            type="search"
          />
        </div>
        <DataTable
          // containerClassName="my-20 max-w-3xl"
          // headerClassName="text-center"
          data={data}
          columns={columns}
          tableRowClassName="text-[hsla(0,1%,38%,1)] "
        />

        <Pagination totalDocs={20} totalPageCount={4} />
      </div>
    </section>
  );
}
