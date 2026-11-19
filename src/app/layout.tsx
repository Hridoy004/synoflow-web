import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import Providers from "@/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Synoflow",
    template: "%s | Synoflow",
  },
  description:
    "Synoflow is a project management workspace to plan sprints, assign tasks and track progress.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4F46E5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <head>
        <Script
          id="synoflow-theme-initializer"
          strategy="beforeInteractive"
        >
          {`
            (() => {
              const savedTheme = localStorage.getItem("synoflow-theme");
              const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              document.documentElement.classList.toggle(
                "dark",
                savedTheme === "dark" || (savedTheme !== "light" && prefersDark),
              );
            })();
          `}
        </Script>
      </head>
      <body className="flex min-h-full flex-col">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
