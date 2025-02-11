import { Subscription } from "@/db/schema";
import { useFormatNumber } from "@/modules/commons/hooks/useFormatNumber";
import { PricingCard } from "../pages/pricing/components/PricingCard";

interface PricingDataProps {
  subscriptions: Array<Subscription>;
  view: "monthly" | "yearly";
}

export function PricingData({ subscriptions, view }: PricingDataProps) {
  const formatCurrency = useFormatNumber();
  const selectedCurrency = "USD";
  const filteredSubscriptions = subscriptions?.filter(
    el => el.period === view && el.currency === selectedCurrency,
  );

  return (
    <section className="shadow-[0px_4px_25px_0px_hsla(0 0%,0%,0.05)] grid grid-cols-1 gap-4 rounded-2xl bg-white-100 p-5 sm:mt-8 sm:grid-cols-2 md:grid-cols-3 md:px-20 lg:grid-cols-4">
      {filteredSubscriptions?.map(plan => (
        <PricingCard
          price={
            typeof plan.amount === "string"
              ? plan.amount
              : formatCurrency(plan.amount ?? 0, {
                  style: "currency",
                  currencyDisplay: "symbol",
                  currency: "USD",
                })
          }
          key={plan.id}
          description={plan?.description ?? ""}
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
