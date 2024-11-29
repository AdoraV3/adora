import BlurIn from "@/components/animations/blur-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FeatureItem } from "./FeatureItem";

interface PricingCardProps {
  price?: string;
  plan?: string;
  features?: string[];
  isYearly?: boolean;
  ctaText?: string;
  isPopular?: boolean;
  paymentLink: string;
}
export function PricingCard({
  plan,
  price,
  isYearly,
  features,
  ctaText,
  isPopular,
  paymentLink,
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
          <div className="mb-5 justify-end flex  ">
            <Badge className="bg-[hsla(25,64%,12%,1)] px-6 rounded-full uppercase text-primary">
              Most Popular
            </Badge>
          </div>
        )}

        <p className="font-satoshi mt-10 font-bold text-3xl">
          {price}
          <span className="text-base font-normal">
            /{isYearly ? "Yearly" : "Monthly"}{" "}
          </span>
        </p>
        <BlurIn
          word={`${plan} Plan`}
          className="my-5 capitalize font-medium text-3xl"
        />

        <div className="mb-4 space-y-5">
          {features?.map((feature, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <FeatureItem key={i} text={feature} />
          ))}
        </div>

        <div className="flex mt-10 justify-center">
          <Link
            target="_blank"
            href={paymentLink}
            className={cn(
              "flex py-3 bg-[hsla(25,64%,12%,0.2)] text-brown-200 justify-center px-6 rounded-full",
              {
                "bg-brown-200 !text-[hsla(0,0%,98%,1)] ": isPopular,
              },
            )}
          >
            {ctaText}{" "}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
