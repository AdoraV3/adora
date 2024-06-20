import { MainNavItem, NavItem } from "@/modules/dashboard/types";
import { FAQ, Option } from "./types/index";

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
    href: "/dashboard/investors",
    icon: "KnowledgeBase",
    items: [
      { title: "View Knowledge Base", href: "/knowledge-base" },
      {
        title: "Create Knowledge Base",
        href: "/knowledge-base/add",
      },
    ],
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
