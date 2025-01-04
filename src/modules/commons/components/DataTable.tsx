"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";
import { EmptyState } from "./EmptyState";
import { PageLoader } from "./PageLoader";
// import { SearchInput } from "./SearchInput";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  headerClassName?: string;
  containerClassName?: string;
  emptyStateText?: string;
  emptyStateImage?: string;
  tableClassName?: string;
  tableRowClassName?: string;
  onRowClick?: (value: Row<TData>) => void;
  //   onFilterChange?: Dispatch<SetStateAction<SessionFilter | undefined>>;
  //   actionButtons?: ReactNode;
  //   id?: string;

  //   currentPage?: number;
  //   fetchNextPage?: (page: number) => void;
  //   fetchPreviousPage?: (page: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  headerClassName,
  containerClassName,
  emptyStateImage,
  emptyStateText,
  tableClassName,
  tableRowClassName,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  // const page = useSearchParams().get("page");
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },

    debugTable: process.env.NODE_ENV === "development",
  });

  return (
    <article
      className={cn(
        "min-h-full rounded-lg bg-white-100 overflow-x-hidden w-full",
        containerClassName,
      )}
    >
      {isLoading ? (
        <PageLoader
          className="flex h-96 items-center justify-center"
          text="Loading..."
        />
      ) : table?.getRowModel().rows?.length ? (
        <Table
          style={{ width: "100%" }}
          className={cn(
            "table-auto overflow-hidden w-full pt-2",
            tableClassName,
          )}
        >
          <TableHeader
            className={cn("text-primary whitespace-nowrap", headerClassName)}
          >
            {table?.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      className={cn(
                        "font-satoshi  text-sm font-normal  text-primary rtl:text-right ",
                        headerClassName,
                      )}
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        width:
                          header.getSize() !== 150
                            ? header.getSize()
                            : undefined,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows.map(row => {
              return (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "font-satoshi text-sm font-normal",
                    tableRowClassName,
                  )}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      className="border-b border-[hsla(0,0%,93%,1)] pb-3"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <EmptyState
          text={emptyStateText}
          image={emptyStateImage}
          className="h-[600px] bg-white-100 py-20"
        />
      )}
    </article>
  );
}
