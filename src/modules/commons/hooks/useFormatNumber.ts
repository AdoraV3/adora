import { useGetLocation } from "./useGetLocation";

export function useFormatNumber() {
  const { data } = useGetLocation();

  const locale = `en-${data?.countryCode ?? "US"}`;
  return (num: number, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(locale, options).format(num);
}
