import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Alternate Cup",
    template: "%s | Alternate Cup",
  },
  description: "Explore believable alternate FIFA World Cup timelines generated with AI.",
  openGraph: {
    title: "Alternate Cup",
    description: "AI-generated alternate football universes for World Cup obsessives.",
    siteName: "Alternate Cup",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-black text-zinc-50">
        <div className="stadium-grid min-h-screen">{children}</div>
      </body>
    </html>
  );
}
