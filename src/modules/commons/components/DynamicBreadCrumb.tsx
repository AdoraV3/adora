"use client";

import React, { ReactNode } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

export function DynamicBreadcrumb({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}: TBreadCrumbProps) {
  const paths = usePathname();
  const pathNames = paths.split("/").filter(path => path);

  return (
    <Breadcrumb>
      <BreadcrumbList className={containerClasses}>
        <BreadcrumbItem className={listClasses}>
          <BreadcrumbLink href="/home">{homeElement}</BreadcrumbLink>
        </BreadcrumbItem>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          const itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          const itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              <BreadcrumbItem className={itemClasses}>
                <Link href={href}>{itemLink?.split("-").join(" ")}</Link>
              </BreadcrumbItem>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
