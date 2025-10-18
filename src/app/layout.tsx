import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";
import { GA_TRACKING_ID } from "@/lib/gtag";
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
  title: "Linkly - Free URL Shortener | Shorten Links Instantly | Best Link Shortener 2024",
  description: "Free URL shortener service. Shorten long URLs instantly with our fast, reliable, and completely free link shortener. No registration required. Perfect alternative to bit.ly, tinyurl, and short.link. Best free URL shortener for social media, marketing, and business links.",
  keywords: "url shortener, link shortener, free url shortener, shorten links, tiny url, bit.ly alternative, free link shortener, url compressor, link management, short links, url reducer, free link management, custom short links, url analytics, link tracking, free url service, professional url shortener, business link shortener, social media links, marketing links, affiliate link shortener, branded short links, qr code generator, bulk url shortener, api url shortener, free forever url shortener, best url shortener, url shortener free, link shortener free, shorten url free, free link shortener no signup, url shortener without registration, instant url shortener, fast url shortener, reliable url shortener, secure url shortener, url shortener for business, url shortener for marketing, social media url shortener, email marketing url shortener, blog url shortener, website url shortener, mobile url shortener, responsive url shortener, modern url shortener, clean url shortener, simple url shortener, easy url shortener, quick url shortener, efficient url shortener, effective url shortener, powerful url shortener, advanced url shortener, premium url shortener, professional url shortener, enterprise url shortener, custom url shortener, branded url shortener, white label url shortener, api url shortener, bulk url shortener, mass url shortener, batch url shortener, multiple url shortener, many url shortener, lots url shortener, tons url shortener, hundreds url shortener, thousands url shortener, millions url shortener, unlimited url shortener, infinite url shortener, endless url shortener, forever url shortener, lifetime url shortener, permanent url shortener, stable url shortener, consistent url shortener, reliable url shortener, trustworthy url shortener, safe url shortener, secure url shortener, protected url shortener, encrypted url shortener, private url shortener, anonymous url shortener, no tracking url shortener, privacy focused url shortener, gdpr compliant url shortener, secure link shortener, safe link shortener, protected link shortener, encrypted link shortener, private link shortener, anonymous link shortener, no tracking link shortener, privacy focused link shortener, gdpr compliant link shortener",
  authors: [{ name: "Linkly" }],
  viewport: "width=device-width, initial-scale=1",
  verification: {
    google: "Ma9zNKrnRDgOafD3KKmvRwkxJkbg63tWEgIjWbP2jUM"
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Linkly - Free URL Shortener | Shorten Links Instantly",
    description: "Free URL shortener service. Shorten long URLs instantly with our fast, reliable, and completely free link shortener. No registration required.",
    type: "website",
    locale: "en_US",
    siteName: "Linkly",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkly - Free URL Shortener",
    description: "Shorten your URLs instantly and for free. No registration required.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://linkly.com",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Linkly",
              "description": "Free URL shortener service to shorten long URLs instantly",
              "url": "https://freelinkly.vercel.app/",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Free URL shortening",
                "No registration required",
                "Instant link generation",
                "Copy to clipboard",
                "Mobile responsive",
                "Dark mode support"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ts3fgn1mtv");
            `
          }}
        />
      </body>
    </html>
  );
}