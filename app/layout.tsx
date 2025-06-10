import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MateLink - Connect, Work, and Buy",
  description:
    "Connect with friends, explore job offers, and buy or sell products on MateLink.",
  applicationName: "MateLink",
  keywords: [
    "MateLink",
    "connect with friends",
    "job offers",
    "buy and sell products",
    "social network",
    "community",
    "networking",
    "online marketplace",
    "MateLink app",
    "MateLink platform",
    "MateLink social network",
    "MateLink community",
    "MateLink marketplace",
  ],
  creator: "Enzo Bustamante",
  authors: {
    name: "Enzo Bustamante",
    url: "https://github.com/Enzo889",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
