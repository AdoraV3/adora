import type { Config } from "tailwindcss";
// eslint-disable-next-line import/no-extraneous-dependencies
import typographyPlugin from "@tailwindcss/typography";
// eslint-disable-next-line import/no-extraneous-dependencies
import tailwindPlugin from "tailwind-scrollbar";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import animatedPlugin from "tailwindcss-animate";
import { shadcnPlugin } from "./themePlugin";

export const shadcnPreset = {
  content: [],
  plugins: [typographyPlugin, animatedPlugin, shadcnPlugin, tailwindPlugin],
  darkMode: ["class"],
} satisfies Config;
