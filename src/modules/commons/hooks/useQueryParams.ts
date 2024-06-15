"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const setQueryParam = (queryName: string, value: string) => {
    return router.push(`${pathname}?${createQueryString(queryName, value)}`);
  };

  const removeQueryParam = (queryNames: Array<string>) => {
    const params = new URLSearchParams(searchParams?.toString());

    queryNames.forEach(queryName => {
      params.delete(queryName);
    });

    const queryString = params.toString();
    let path = `${pathname}/`;
    if (queryString !== "") {
      path += `?${queryString}`;
    }
    return path;
  };

  // Create query string
  const createQueryStrings = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      });

      return newSearchParams.toString();
    },
    [searchParams],
  );

  return {
    queryParams: searchParams,
    // createQueryString,
    setQueryParam,
    removeQueryParam,
    pathname,
    createQueryStrings,
  };
}
