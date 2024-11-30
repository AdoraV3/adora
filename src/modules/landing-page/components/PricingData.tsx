import { Subscription } from "@/db/schema";
import { useFormatNumber } from "@/modules/commons/hooks/useFormatNumber";
import { useGetLocation } from "@/modules/commons/hooks/useGetLocation";
import { PricingCard } from "../pages/pricing/components/PricingCard";

interface PricingDataProps {
  subscriptions: Array<Subscription>;
  view: "monthly" | "yearly";
}

export function PricingData({ subscriptions, view }: PricingDataProps) {
  const formatCurrency = useFormatNumber();
  const { data: locationData, isPending } = useGetLocation();
  const selectedCurrency = locationData?.country === "Nigeria" ? "NGN" : "USD";
  const filteredSubscriptions = subscriptions?.filter(
    el => el.period === view && el.currency === "USD",
  );

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <section className="grid grid-cols-1 md:px-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 rounded-2xl gap-4 bg-white-100 shadow-[0px_4px_25px_0px_hsla(0 0%,0%,0.05)] sm:mt-8">
      {filteredSubscriptions?.map(plan => (
        <PricingCard
          price={formatCurrency(plan.amount ?? 0, {
            style: "currency",
            currencyDisplay: "symbol",
            currency: locationData?.country === "Nigeria" ? "NGN" : "USD",
          })}
          key={plan.id}
          isYearly={view === "yearly"}
          features={plan.features ?? []}
          plan={plan?.plan ?? ""}
          ctaText={plan.plan === "enterprise" ? "Contact Us" : "Choose Plan"}
          isPopular={plan.plan === "premium"}
          priceId={plan.priceId ?? ""}
        />
      ))}
    </section>
  );
}
