import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Odyssey",
  description: "Odyssey",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://cdn.seline.so https://dashboard.10xlaunch.ai; connect-src 'self' https://api.seline.so; font-src 'self' data:; img-src 'self' data: https://*.gstatic.com https://*.googleapis.com; style-src 'self' 'unsafe-inline';"
        />
        <Script
          src="https://cdn.seline.so/seline.js"
          async
          strategy="beforeInteractive"
          data-token="4e2208f89f6e348"
        />
        <Script
          src="https://dashboard.10xlaunch.ai/widget"
          data-app-id="495289df-8dbf-45c5-b22e-46fa20967a1b"
          async
          defer
          strategy="lazyOnload"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
