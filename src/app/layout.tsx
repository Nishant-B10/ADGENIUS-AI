import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "AdGenius AI - Intelligence Meets Imagination",
  description: "AI-powered advertising platform that creates effective campaigns using proven marketing principles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-deep-black">
        <Navigation />
        {children}
      </body>
    </html>
  );
}