import Lanyard from "@/components/lanyard";
import Navigation from "@/components/navigation/navigation";
import NowPlaying from "@/components/now-playing";
import ReturnToIndex from "@/components/return-to-index";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import {
  Inter as FontSans,
  Nanum_Myeongjo as FontSerif,
} from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shreyashsng.me"),
  alternates: {
    types: {
      "application/rss+xml": `https://shreyashsng.me/rss.xml`,
    },
  },
  applicationName: "shreyashsng.me",
  authors: { name: "Shreyash Singh" },
  creator: "shreyashsng",
  publisher: "shreyashsng",
  generator: "Next.js",
  keywords: [
    "shreyashsng",
    "shreyash singh",
    "oyeshrey",
    "Shreyash Singh",
    "shreyash Singh",
    "Shreyash singh",
    "Shrey Singh",
    "Shreyash",
    "Shreyash  Singh",
    "shreyashsng.me",
  ],
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/avatar.avif",
  },
  appleWebApp: {
    title: "shreyashsng.me",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  title: {
    default: "shreyash singh",
    template: "%s — shreyash singh",
  },
  description:
    "Shreyash designing by day and editing by night.",
  openGraph: {
    url: "https://shreyashsng.me",
    title: "shreyash singh",
    description:
      "Shreyash designing by day and editing by night.",
    images: "/avatar.avif",
    siteName: "zpuckeridge",
  },
  twitter: {
    creator: "@shreyashsng",
    card: "summary_large_image",
    images: "/avatar.avif",
    description:
      "Shreyash designing by day and editing by night.",
    creatorId: "shreyashsng",
    title: "Shreyash Singh",
    site: "@shreyashsng",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `min-h-screen font-sans antialiased text-black dark:text-neutral-300 selection:bg-neutral-200/75 dark:selection:bg-neutral-700/75 `,
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="pointer-events-none fixed inset-x-0 bottom-10 lg:bottom-0 h-20  bg-gradient-to-t from-white dark:from-background  z-10" />

          <div className="flex lg:flex-row flex-col gap-8 lg:gap-0 md:justify-between p-8 ">
            <ReturnToIndex />

            <div className="w-full">{children}</div>

            <Navigation />

            <div className="fixed bottom-8 left-8 hidden lg:block z-20">
              <Lanyard />
            </div>

            <div className="fixed bottom-8 right-8 hidden lg:block z-20">
              <NowPlaying />
            </div>
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
      {/* <Script src={UMAMI_SCRIPT_URL} data-website-id={UMAMI_WEBSITE_ID} /> */}
    </html>
  );
}
