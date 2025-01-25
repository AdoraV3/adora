import BlurIn from "@/components/animations/blur-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { checkoutAction } from "@/lib/checkout";
import { cn } from "@/lib/utils";
import { FeatureItem } from "./FeatureItem";

interface PricingCardProps {
  price?: string;
  plan?: string;
  features?: string[];
  isYearly?: boolean;
  ctaText?: string;
  isPopular?: boolean;
  priceId?: string;
}
export function PricingCard({
  plan,
  price,
  isYearly,
  features,
  ctaText,
  isPopular,
  priceId,
}: PricingCardProps) {
  return (
    <Card
      className={cn(" h-max rounded-2xl text-gray-2 py-4 shadow-md", {
        "bg-[hsla(25,64%,24%,1)] text-white-100 shadow-[0px_42px_34px_0px_hsla(25,64%,36%,0.28)] ":
          isPopular,
      })}
    >
      <CardContent>
        {isPopular && (
          <div className="flex justify-end mb-5 ">
            <Badge className="bg-[hsla(25,64%,12%,1)] px-6 rounded-full uppercase text-primary">
              Most Popular
            </Badge>
          </div>
        )}

        <p className="mt-10 text-3xl font-bold font-satoshi">
          {price}
          <span className="text-base font-normal">
            /{isYearly ? "Yearly" : "Monthly"}{" "}
          </span>
        </p>
        <BlurIn
          word={`${plan} Plan`}
          className="my-5 text-3xl font-medium capitalize"
        />

        <div className="mb-4 space-y-5">
          {features?.map((feature, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <FeatureItem key={i} text={feature} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <form action={checkoutAction}>
            <Input type="hidden" name="priceId" value={priceId} />
            <Button
              className={cn(
                "flex  bg-[hsla(25,64%,12%,0.2)] text-brown-200 justify-center px-6 rounded-full",
                {
                  "bg-brown-200 !text-[hsla(0,0%,98%,1)] ": isPopular,
                },
              )}
            >
              {ctaText}{" "}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
