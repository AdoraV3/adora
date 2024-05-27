import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export const shadcnPlugin = plugin(
  // 1 add base css variable
  // eslint-disable-next-line func-names
  function ({ addBase }) {
    addBase({
      ":root": {
        // shadcn theme
        "--background": "0 0% 100%, 1",
        "--foreground": "0 0% 3.9%, 1",
        "--muted": "0 1% 96.1%, 1",
        "--muted-foreground": "260, 4%, 52%, 1",
        "--popover": "0 0% 100%",
        "--popover-foreground": "0 0% 3.9%",
        "--card": "0 0% 100%",
        "--card-foreground": "0 0% 3.9%",
        "--border": "0 0% 89.8%",
        "--input": "0 0% 89.8%",
        "--primary": "246, 91%, 61%",
        "--primary-foreground": "270, 25%, 98%",
        "--secondary": "0 0% 96.1%",
        "--secondary-foreground": "0 0% 9%",
        "--accent": "0 0% 96.1%",
        "--accent-foreground": " ",
        "--destructive": "0 84.2% 60.2%",
        "--destructive-foreground": "0 0% 98%",
        "--ring": "0 0% 63.9%",
        "--radius": "0.5rem",

        // custom themes

        "--brown-100": "25, 64%, 36%, 1",
        "--brown-200": "25, 64%, 12%, 1",
        "--black-100": "0, 0%, 2%, 1",
        "--red": "12, 100%, 49%, .1",
        "--blue": "201, 100%, 50%, .1",
        "--green": "170, 73%, 46%, 0.1",
        "--white": "0, 0%, 100%, 1",
        "--gray": "260, 9%, 92%, 1",
        "--gray-2": "0, 0%, 34%, 1",
        "--gray-300": "0, 0%, 34%, 1",
        "--gray-400": "0, 0%, 0%, 0.1",
        "--gray-450": "0, 0%, 0%, 0.08",
        "--yellow": "39, 100%, 73%, 1",
        "--gray-500": "hsla(213, 10%, 18%, 0.44)",
      },
      ".dark": {
        "--background": "0 0% 3.9%",
        "--foreground": "0 0% 98%",
        "--muted": "0 1% 14.9%",
        "--muted-foreground": "0 0% 63.9%",
        "--popover": "0 0% 3.9%",
        "--popover-foreground": "0 0% 98%",
        "--card": "0 0% 3.9%",
        "--card-foreground": "0 0% 98%",
        "--border": "0 0.5% 14.8%",
        "--input": "0 0% 14.4%",
        "--primary": "0 0% 98%",
        "--primary-foreground": "0 0% 9%",
        "--secondary": "0 0% 14.9%",
        "--secondary-foreground": "0 0% 98%",
        "--accent": "0 0% 14.6%",
        "--accent-foreground": " ",
        "--destructive": "0 62.8% 30.6%",
        "--destructive-foreground": "0 85.7% 97.3%",
        "--ring": "0 0% 14.9%",
      },
    });
    addBase({
      "*": { "@apply border-border": {} },
      body: { "@apply  text-foreground": {} },
    });
  },
  // 2. Extend the tailwindCSS theme
  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsla(var(--border))",
          input: "hsla(var(--input))",
          ring: "hsla(var(--ring))",
          background: "hsla(var(--background))",
          foreground: "hsla(var(--foreground))",
          primary: {
            DEFAULT: "hsla(var(--brown-100))",
            foreground: "hsla(var(--brown-foreground))",
          },
          // blue: {
          //   DEFAULT: "hsla(var(--blue))",
          //   foreground: "hsla(var(--blue-foreground))",
          // },
          secondary: {
            DEFAULT: "hsla(var(--secondary))",
            foreground: "hsla(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsla(var(--destructive))",
            foreground: "hsla(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsla(var(--muted))",
            foreground: "hsla(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsla(var(--accent))",
            foreground: "hsla(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsla(var(--popover))",
            foreground: "hsla(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsla(var(--card))",
            foreground: "hsla(var(--card-foreground))",
          },
          gray: {
            100: "hsla(var(--gray))",
            2: "hsla(var(--gray-2))",
            200: "hsla(var(--gray-200))",
            400: "hsla(var(--gray-400))",
            450: "hsla(var(--gray-450))",
            500: "hsla(var(--gray-500))",
          },
          white: {
            100: "hsla(var(--white))",
          },
          green: {
            100: "hsla(var(--green-foreground))",
          },
          red: {
            100: "hsla(var(--red-foreground))",
            light: "hsla(var(--red))",
          },
          brown: {
            200: "hsla(var(--brown-200))",
          },
          yellow: {
            100: "hsla(var(--yellow))",
          },

          black: {
            100: "hsla(var(--black-100))",
          },
          blue: {
            100: "hsla(var(--blue-foreground))",
            light: "hsla(var(--blue))",
          },
          purple: {
            100: "hsla(var(--purple-foreground))",
            light: "hsla(var(--purple))",
          },
        },
        borderRadius: {
          default: "10px",
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },

        fontFamily: {
          coreC: ["var(--coreC-font)", ...fontFamily.sans],
          satoshi: ["var(--satoshi-font)", ...fontFamily.sans],
        },

        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
          "caret-blink": {
            "0%,70%,100%": { opacity: "1" },
            "20%,50%": { opacity: "0" },
          },
        },

        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "caret-blink": "caret-blink 1.25s ease-out infinite",
        },
      },
    },
  },
);
