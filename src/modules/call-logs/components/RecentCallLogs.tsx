import { Icons } from "@/components/icons";
import { DataTable } from "@/modules/commons/components";
import { Pagination } from "@/modules/commons/components/Pagination";
import Link from "next/link";
import { useMemo } from "react";

export function RecentCallLogs() {
  const data = [
    {
      id: 1,
      agent: "Agent X",
      date: "Jan-12-24",
      time: "8:00 am",
      transcript:
        "Client: Hi there, I'm  trouble placing an order on your website. Every time I get to the checkout ...",
    },
    {
      id: 2,
      agent: "Agent Y",
      date: "Jan-12-24",
      time: "8:00 am",
      transcript:
        "Client: Hi there, I'm having trouble placing order on your website. Every time I get to the checkout ...",
    },
    {
      id: 3,
      agent: "Agent Z",
      date: "Jan-12-24",
      time: "8:00 am",
      transcript:
        "Client: Hi there, Im having trouble placing an order on your website. Every time I get to the checkout ...",
    },
    {
      id: 4,
      agent: "Agent A",
      date: "Jan-12-24",
      time: "8:00 am",
      transcript:
        "Client: Hi there, I'm having trouble placing an order on your website. Every time I get to the checkout ...",
    },
    {
      id: 5,
      agent: "Agent B",
      date: "Jan-12-24",
      time: "8:00 am",
      transcript:
        "Client: Hi there, I'm having trouble placing an order on your website. Every time I get to the checkout ...",
    },
  ];
  const columns = useMemo(() => {
    return [
      {
        size: 100,
        accessorKey: "agent",
        header: "Agents",
        cell: () => {
          return <Link href="/call-logs/1">Agent X </Link>;
        },
      },
      {
        size: 100,
        accessorKey: "date",
        header: "Date",
      },
      {
        size: 100,
        accessorKey: "time",
        header: "Time",
      },
      {
        accessorKey: "transcript",
        header: "Conversation Transcription",
      },
      {
        id: "actions",
        header: "Conversation Audio",
        enableHiding: false,
        cell: () => {
          return (
            <div className="flex justify-center">
              <Icons.Mic />
            </div>
          );
        },
      },
    ];
  }, []);
  return (
    <>
      <DataTable
        tableClassName="max-w-4xl mt-20"
        headerClassName="text-center"
        data={data}
        columns={columns}
      />
      <Pagination totalDocs={20} totalPageCount={5} />
    </>
  );
}
