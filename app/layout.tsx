import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ile — Latin America Travel",
  description:
    "Design your Latin America trip with a concierge who knows the region.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
