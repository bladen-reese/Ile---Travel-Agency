import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yaguarete Travels — Latin America Concierge",
  description:
    "We design trips across South and Central America using places we've actually stayed. Panama, Colombia, Ecuador, Brazil, Argentina, Peru.",
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
