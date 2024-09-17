export interface FAQ {
  title: string;
  content: string;
  id: number;
}

export interface Option {
  label: string;
  value: string;
}

export interface NavItem extends Option {
  href: string;
}
export interface ListItem {
  title: string;
  description: string;
  image: string;
}

export interface PricingPlan {
  amount: {
    monthly: number;
    yearly: number;
  };
  plan: string;
  features: string[];
  isPopular?: boolean;
  price?: string;
  monthlyPrice?: string;
  yearlyPrice?: string;
  actionLabel: string;
  regionalPrices?: Record<string, PricingPlan["amount"]>;
}
