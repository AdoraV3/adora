import { getAgentAction } from "@/app/actions/agent";
import { getCallsAction } from "@/app/actions/call-log";
import { InboundPhoneCall } from "@/app/actions/vapi/type";
import { Icons } from "@/components/icons";
import { useServerActionQuery } from "@/lib/hooks/server-action-hooks";
import { DataTable } from "@/modules/commons/components";
import { ColumnDef } from "@tanstack/react-table";
import { addDays } from "date-fns/addDays";
import { formatDate } from "date-fns/format";
import Link from "next/link";
import { useMemo } from "react";

interface RecentCallLogsProps {
  type: "recent" | "past";
}
export function RecentCallLogs({ type }: RecentCallLogsProps) {
  const { data: agent } = useServerActionQuery(getAgentAction, {
    input: undefined,
    queryKey: ["getAgent"],
  });

  const columns: ColumnDef<InboundPhoneCall>[] = useMemo(() => {
    return [
      {
        accessorKey: "agent",
        header: "Agents",
        cell: ({ row }) => {
          const { id } = row.original;
          return (
            <Link className="w-max whitespace-nowrap" href={`/call-logs/${id}`}>
              {agent?.data.name}
            </Link>
          );
        },
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <p className="w-max">
            {formatDate(row.original.createdAt, "dd MMM, yyyy")}{" "}
          </p>
        ),
      },
      {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => (
          <p className="w-max">
            {formatDate(row.original.createdAt, "h:mm a")}{" "}
          </p>
        ),
      },
      {
        accessorKey: "transcript",
        header: "Conversation Transcription",
        cell: ({ row }) => {
          return <p className="line-clamp-2">{row.original.summary} </p>;
        },
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
  }, [agent?.data.name]);

  const { data: call } = useServerActionQuery(getCallsAction, {
    input: {
      assistantId: agent?.data.assistantId ?? "",
      createdAtGe:
        type === "recent" ? addDays(new Date(), -7).toISOString() : undefined,
      createdAtLe:
        type === "past" ? addDays(new Date(), -7).toISOString() : undefined,
    },
    queryKey: ["getCallLogs", type],
    enabled: !!agent?.data.assistantId,
  });

  return (
    <DataTable
      tableClassName="max-w-4xl"
      headerClassName="text-center"
      data={call?.data ?? []}
      columns={columns}
    />
  );
}
