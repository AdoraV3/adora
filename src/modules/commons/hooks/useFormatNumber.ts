export function useFormatNumber() {
  const locale = `en-${"US"}`;
  return (num: number, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(locale, options).format(num);
}
