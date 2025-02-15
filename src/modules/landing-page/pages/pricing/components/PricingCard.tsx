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
  description?: string;
}
export function PricingCard({
  plan,
  price,
  isYearly,
  features,
  ctaText,
  isPopular,
  priceId,
  description,
}: PricingCardProps) {
  return (
    <Card
      className={cn(" h-max rounded-2xl py-4 text-gray-2 shadow-md", {
        "bg-[hsla(25,64%,24%,1)] text-white-100 shadow-[0px_42px_34px_0px_hsla(25,64%,36%,0.28)] ":
          isPopular,
      })}
    >
      <CardContent>
        {isPopular && (
          <div className="mb-5 flex justify-end ">
            <Badge className="rounded-full bg-[hsla(25,64%,12%,1)] px-6 uppercase text-primary">
              Most Popular
            </Badge>
          </div>
        )}

        <p className="mt-10 font-satoshi text-3xl font-bold">
          {price}
          <span className="text-base font-normal">
            /{isYearly ? "Yearly" : "Monthly"}{" "}
          </span>
        </p>
        {description && (
          <p
            className={`mt-3 text-sm ${
              isPopular ? "text-[#ffffff]" : "text-[#444444]"
            }
         `}
          >
            {description}
          </p>
        )}
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

        <div className="mt-10 flex justify-center">
          <form action={checkoutAction}>
            <Input type="hidden" name="priceId" value={priceId} />
            <Button
              className={cn(
                "flex  justify-center rounded-full bg-[hsla(25,64%,12%,0.2)] px-6 text-brown-200",
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
