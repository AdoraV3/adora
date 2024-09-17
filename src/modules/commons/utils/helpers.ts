import { PricingPlan } from "@/mock/types";
import { FormatDateOptions, format } from "date-fns";
import { useFormatNumber } from "../hooks/useFormatNumber";

export const getInitials = (name: string | undefined): string => {
  if (!name) return "";
  const names = name?.split(" ").slice(0, 2); // Take only the first two names
  const initials = names?.map(word => word.charAt(0)).join("");
  return initials.toUpperCase();
};

export const useFormatDate = () => {
  return (
    date: Date | number | string,
    formatStr: string,
    options?: FormatDateOptions,
  ) => {
    return format(date, formatStr, { ...options });
  };
};

export function useFormatSize() {
  const formatNumber = useFormatNumber();

  return (num: number | undefined, options?: Intl.NumberFormatOptions) =>
    formatNumber((num ?? 0) / 1000, {
      notation: "compact",
      style: "unit",
      unit: "kilobyte",
      unitDisplay: "short",
      ...options,
    });
}

export function formatDateToCustomFormat(date: Date): string {
  // Format the date using date-fns up to milliseconds precision
  const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss.SSS");

  // Simulate microseconds by generating a random three-digit number
  const randomMicroseconds = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  // Concatenate the formatted date with the simulated microseconds
  return `${formattedDate}${randomMicroseconds}`;
}

export const getRegionalPrice = (
  pricingPlan: PricingPlan,
  plan: "monthly" | "yearly",
  country = "Canada",
): number => {
  // Check if there is a regional price for the specified country
  const regionalPrice = pricingPlan?.regionalPrices?.[country]?.[plan];
  return regionalPrice !== undefined ? regionalPrice : pricingPlan.amount[plan];
};
