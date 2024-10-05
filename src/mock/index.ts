/* eslint-disable sonarjs/no-duplicate-string */
import { MainNavItem, NavItem } from "@/modules/dashboard/types";
import { FAQ, ListItem, Option, PricingPlan } from "./types/index";

export const SIDEBAR_ITEMS: Array<MainNavItem> = [
  {
    title: "Dashboard",
    href: "/home",
    icon: "Dashboard",
  },
  {
    title: "Call Logs",
    href: "/call-logs",
    icon: "Call",
  },
  {
    title: "Knowledge Base",
    href: "/knowledge-base",
    icon: "KnowledgeBase",
    // items: [
    //   { title: "View Knowledge Base", href: "/knowledge-base" },
    //   {
    //     title: "Create Knowledge Base",
    //     href: "/knowledge-base/add",
    //   },
    // ],
  },
  {
    title: "Outbound Calls",
    icon: "OutboundCall",
    href: "/outbound-calls",
  },
  { title: "Payment", href: "/payment", icon: "Wallet" },
  { title: "Database API", href: "/database", icon: "Api" },
  {
    title: "Settings",
    href: "/account-settings?tab=accountInfo",
    icon: "Settings",
  },
];

export const BOTTOM_SIDEBAR_ITEM: NavItem[] = [
  { title: "Log out", href: "/", icon: "Logout", isButton: true },
];

export const FAQs: Array<FAQ> = [
  {
    title: "Can I cancel my subscription at any time?",
    content:
      "We offer flexible subscription options, allowing you to adjust or cancel your plan as per your business requirements, with transparent and simple cancellation policies.",
    id: 1,
  },
  {
    title:
      "Can the solution be customized to suit my business’s specific needs?",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur earum magni ea error accusamus natus maiores tempore illum, explicabo eaque facilis, mollitia perspiciatis numquam nam ad neque, maxime excepturi. Rerum?",
    id: 2,
  },
  {
    title: "Is it possible for Adora call to manage multiple branches?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse deleniti deserunt eum, consequuntur animi tempora facere maxime natus, beatae voluptas ut. Fuga, quisquam alias aut tempora dolor eaque eius magni!",
    id: 3,
  },
  {
    title: "Is there any setup fee involved?",
    content:
      "Lorem ipsum dolor sit, elit. Esse deleniti deserunt eum, consequuntur animi tempora facere maxime natus, beatae voluptas ut. Fuga, quisquam alias aut tempora dolor eaque eius magni!",
    id: 4,
  },
  {
    title: "Can I change my plan anytime",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla excepturi, quis sapiente assumenda eaque harum atque. Alias aperiam, explicabo optio quis obcaecati omnis blanditiis ratione magni dolor soluta animi est?",
    id: 5,
  },
  {
    title: "Is there a cancellation fee?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, recusandae similique. Voluptates nihil, amet accusamus quos natus perferendis excepturi reiciendis, voluptas dicta consequuntur enim laborum dignissimos nam distinctio? In, saepe.",
    id: 6,
  },
];

export const BRANDS = [
  "/images/Cowrywise.png",
  "/images/kuda.png",
  "/images/asu.png",
  "/images/filmhouse.png",
  "/images/airpeace.png",
  "/images/ariiya.png",
  "/images/betway.png",
  "/images/bolt.png",
  "/images/carbon.png",
  "/images/iroko.png",
  "/images/dominos.png",
  "/images/smile.png",
  "/images/axa.png",
  "/images/piggyvest.png",
  "/images/ibom-ait.png",
  "/images/bolt.png",
];

export const VOICES: Array<Option> = [
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Male",
    value: "male",
  },
];

export const LANGUAGES: Array<Option> = [
  {
    label: "English",
    value: "english",
  },
  {
    label: "Yoruba",
    value: "yoruba",
  },
  {
    label: "Igbo",
    value: "igbo",
  },
  {
    label: "Hausa",
    value: "hausa",
  },
  {
    label: "French",
    value: "french",
  },
];

export const NAVBAR_ITEMS: Array<NavItem> = [
  { label: "Home", href: "/", title: "Home" },
  {
    label: "Pricing",

    href: "/pricing",
    title: "Pricing",
  },
  {
    href: "/about",
    title: "About Us",
    label: "About Us",
  },
  {
    href: "/contact-us",
    title: "Contact Us",
    label: "Contact Us",
  },
];

export const REVOLUTION_ITEMS: Array<ListItem> = [
  {
    title: "AI-Powered Assistance",
    description:
      "Our AI customer service agents are equipped to handle inbound and outbound calls, process orders, schedule appointments, and even securely process payments, all with the finesse and empathy of a seasoned human agent.",
    image: "/images/ai-powered.png",
  },
  {
    title: "Cost-Effective Solution",
    description:
      "Say goodbye to the hefty costs associated with traditional call centers. Adora offers a cost-effective alternative that delivers exceptional results without breaking the bank.",
    image: "/images/cost.png",
  },
  {
    title: "Scalability & Efficiency",
    description:
      "As your business grows, so does Adora. Our AI call center solution is scalable, allowing you to handle increasing call volumes without sacrificing quality or customer satisfaction.",
    image: "/images/scale.png",
  },
];

export const USE_CASES: Array<ListItem> = [
  {
    title: "Healthcare",
    description:
      "Adora can answer frequently asked patient questions (FAQs) about appointments, billing, or basic medical inquiries, reducing the burden on medical staff. This allows them to focus on providing personalized care.",
    image: "/images/healthcare.png",
  },
  {
    title: "Retail & E-commerce",
    description:
      "Adora provides instant troubleshooting and answers to frequently asked questions, freeing up human agents for more complex issues.",
    image: "/images/retail.png",
  },
  {
    title: "Restaurants & Hospitality",
    description:
      "Customers can browse menus, place orders, and receive confirmation - all within Adora's platform, reducing wait times and streamlining the ordering process.",
    image: "/images/restaurant.png",
  },
  {
    title: "Professional Services",
    description:
      "Clients can inquire about appointments, schedules, or service details using natural language.  Adora understands their intent, retrieves information from your system, and provides real-time updates.",
    image: "/images/professional.png",
  },
];

export const PRICING_PLANS: Array<PricingPlan> = [
  {
    amount: {
      monthly: 0,
      yearly: 0,
    },
    plan: "Basic",
    features: [
      "500 Calls",
      "Basic call handling",
      "Email support",
      "Full conversational AI technology.",
      "24/7 answering, Call forwarding and Outbound calls.",
      "Customized greeting.",
    ],
    regionalPrices: {
      Nigeria: {
        monthly: 0,
        yearly: 0,
      },
    },
    actionLabel: "Choose Plan",
  },
  {
    amount: {
      monthly: 29,
      yearly: 290,
    },
    plan: "Starter",
    features: [
      "2000 Calls",
      "Custom call scripts.",
      "Priority email support.",
      "Full conversational AI technology.",
      "24/7 answering, Call forwarding and Outbound calls.",
      " Customized greeting.",
      "Company operations in real-time.",
      "Multiple languages and voice choices.",
      "Detailed usage analytics.",
      "Answers multiple calls simultaneously.",
    ],
    regionalPrices: {
      Nigeria: {
        monthly: 2000,
        yearly: 20000,
      },
    },
    actionLabel: "Choose Plan",
  },
  {
    amount: {
      monthly: 99,
      yearly: 999,
    },
    plan: "Premium",
    features: [
      "5000 Calls",
      "Custom call scripts.",
      "Priority email support.",
      "Full conversational AI technology.",
      "24/7 answering, Call forwarding and Outbound calls.",
      " Customized greeting.",
      "Company operations in real-time.",
      "Multiple languages and voice choices.",
      "Detailed usage analytics.",
      "Answers multiple calls simultaneously.",
      "Advanced voice recognition.",
      "Multilingual support Integration with Twilio for SMS and email notifications.",
      "Phone support.",
    ],
    regionalPrices: {
      Nigeria: {
        monthly: 5000,
        yearly: 50000,
      },
    },
    isPopular: true,
    actionLabel: "Choose Plan",
  },
  {
    amount: {
      monthly: 199,
      yearly: 1990,
    },
    plan: "Custom",
    features: [
      "Unlimited Calls",
      "Unlimited Contacts",
      "All Premium features plus custom integrations.",
      "Dedicated account manager.",
      "SLA guarantees and personalized support.",
      "24/7 Support",
      "Customizable Voice & Language",
      "Customizable Branding",
      "Customizable Use Cases",
      "Choice of 10 distinct voices.",
      "Custom integration.",
      "Detailed usage analytics.",
      "Company operations in real-time.",
    ],
    regionalPrices: {
      Nigeria: {
        monthly: 10000,
        yearly: 100000,
      },
    },
    actionLabel: "Contact Sales",
  },
];

export const assistantConfig = {
  transcriber: {
    provider: "deepgram", // Default transcriber
    keywords: [],
  },
  model: {
    provider: "openai",
    model: "gpt-4", // Using GPT-4 as the model
    knowledgeBase: {
      provider: "canonical",
      topK: 10,
      fileIds: [],
    },
  },
  voice: {
    provider: "11labs",
    voiceId: "TWUKKXAylkYxxlPe4gx0", // Default voice
  },
  endCallFunctionEnabled: true, // Allows the assistant to end the call
};
