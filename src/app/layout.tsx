import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import toast, { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "@/components/ui/SessionProviderWrapper";


export const metadata: Metadata = {
  title: {
    default: "Services Hub",
    template: "%s | Services Hub",
  },
  description: "Your one-stop destination for all services",
  keywords: ["services", "business", "solutions", "hub"],
  authors: [{ name: "Services Hub Team" }],
  creator: "Services Hub",
  publisher: "Services Hub",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://serviceshub.com",
    title: "Services Hub",
    description: "Your one-stop destination for all services",
    siteName: "Services Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services Hub",
    description: "Your one-stop destination for all services",
    creator: "@serviceshub",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProviderWrapper>
        <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors">
          <Navbar />
          {children}
          <Toaster />
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
