import { MainNavItem, NavItem } from "@/modules/dashboard/types";
import { FAQ } from "./types/index";

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
  },
  {
    title: "Outbound Calls",
    icon: "OutboundCall",
    // items: [
    //   { title: "Payment", href: "/dashboard/users" },
    //   { title: "Database API", href: "/dashboard/roles" },
    //   { title: "Settings", href: "/dashboard/roles" },
    // ],
  },
  { title: "Payment", href: "/dashboard/users", icon: "Wallet" },
  { title: "Database API", href: "/dashboard/roles", icon: "Api" },
  { title: "Settings", href: "/dashboard/roles", icon: "Settings" },
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
