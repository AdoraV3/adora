import { Providers } from "@/services/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Viewport } from "next";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";

const CORE_SANS_C = localFont({
  src: [
    {
      path: "../../public/fonts/CoreSansCRegular.woff",
      weight: "400",
    },
    {
      path: "../../public/fonts/CoreSansCMedium.woff",
      weight: "500",
    },
    // {
    //   path: "../../public/fonts/SF-Pro-Display-Semibold.otf",
    //   weight: "600",
    // },
    {
      path: "../../public/fonts/CoreSansCMedium.woff",
      weight: "700",
    },
    {
      path: "../../public/fonts/CoreSansCBold.woff",
      weight: "800",
    },
    {
      path: "../../public/fonts/CoreSansCBlack.woff",
      weight: "900",
    },
  ],
  variable: "--coreC-font",
});
const SATOSHI = localFont({
  src: [
    {
      path: "../../public/fonts/SatoshiRegular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/SatoshiMedium.otf",
      weight: "500",
    },
    // {
    //   path: "../../public/fonts/SatoshiSemibold.otf",
    //   weight: "600",
    // },
    {
      path: "../../public/fonts/SatoshiBold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/SatoshiBlack.otf",
      weight: "900",
    },
  ],
  variable: "--satoshi-font",
});

export const metadata = {
  title: "Adora",
  description: "AI Agent for your business",
  keywords: "",
  openGraph: {
    url: "https://www.adora.com/",
    siteName: "Adora",
    images: "/images/adora.png",
    type: "website",
    countryName: "Nigeria",
    title: "Adora",
    description: "AI Agent for your business",
    locale: "en_NG",
  },
  twitter: {
    images: "/images/adora.png",
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${CORE_SANS_C.variable} ${SATOSHI.variable}`}>
        <Providers>
          <SpeedInsights />
          <NextTopLoader color="hsla(25, 64%, 36%, 1)" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
