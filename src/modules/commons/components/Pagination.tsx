"use client";

import ReactPaginate from "react-paginate";

import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { useQueryParams } from "../hooks/useQueryParams";

interface PaginationProps {
  totalPageCount?: number;
  totalDocs?: number;
  pageLimit?: number;
  className?: string;
}

export function Pagination({
  totalPageCount,
  totalDocs = 0,
  pageLimit,
  className,
}: PaginationProps) {
  const router = useRouter();
  const { createQueryStrings, queryParams } = useQueryParams();
  const limit = Number(queryParams.get("limit")) || pageLimit || 10;

  const currentPage = Number(queryParams.get("page")) || 1;
  const startIndex = (currentPage - 1) * limit + 1;
  const endIndex = Math.min(currentPage * limit, totalDocs);

  return (
    <div
      className={cn("flex flex-col items-center gap-6 md:flex-row", className)}
    >
      {totalDocs > 0 && (
        <div className="mt-10 font-sfPro text-sm font-medium text-gray-650">
          <p className="font-sfPro text-sm font-medium text-gray-650">
            Showing data {startIndex} to {endIndex} of {totalDocs} entries
          </p>
        </div>
      )}

      <ReactPaginate
        breakLabel={<span className="mr-5"> ... </span>}
        nextLabel="Next"
        onPageChange={page => {
          router.push(
            `?${createQueryStrings({
              page: ((page?.selected ?? 0) + 1)?.toString(),
              limit,
            })}`,
          );
        }}
        pageRangeDisplayed={3}
        pageCount={totalPageCount ?? 0}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center items-center gap-2 mt-10"
        pageClassName="bg-white-100 border   border-[hsla(0,0%,93%,1)] text-black-100  items-center mr-2 md:mr-3  h-8 w-8 flex justify-center rounded-md"
        activeClassName="text-white-100 !bg-primary"
        forcePage={currentPage - 1}
      />
    </div>
  );
}
