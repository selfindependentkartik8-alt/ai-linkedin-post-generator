import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://ailinkedinpostgenerator.krishaiworks.com"
  ),

  title: "AI LinkedIn Post Generator | Create Engaging LinkedIn Posts",
  description:
    "Generate professional LinkedIn posts, engaging hooks, and relevant hashtags with AI. Create LinkedIn content in seconds with KrishAIWorks.",

  keywords: [
    "AI LinkedIn Post Generator",
    "LinkedIn Post Generator",
    "AI LinkedIn Content Generator",
    "LinkedIn AI Writer",
    "LinkedIn Post Writer",
    "AI Social Media Writer",
    "LinkedIn Content Creator",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.vercel.app",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  alternates: {
    canonical: "https://ailinkedinpostgenerator.krishaiworks.com/",
  },

  openGraph: {
    title: "AI LinkedIn Post Generator | KrishAIWorks",
    description:
      "Create professional LinkedIn posts, engaging hooks, and relevant hashtags with AI in seconds.",
    url: "https://ailinkedinpostgenerator.krishaiworks.com/",
    siteName: "KrishAIWorks",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI LinkedIn Post Generator | KrishAIWorks",
    description:
      "Generate professional LinkedIn posts, hooks, and hashtags with AI.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://krishaiworks.com/#organization",
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://krishaiworks.com/logo.png",
        width: 512,
        height: 512,
      },
    },

    {
      "@type": "WebSite",
      "@id": "https://krishaiworks.com/#website",
      url: "https://krishaiworks.com",
      name: "KrishAIWorks",
      description:
        "AI-powered tools, productivity utilities, automation, chatbots, websites and custom digital solutions.",
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
      inLanguage: "en",
    },

    {
      "@type": "WebApplication",
      "@id":
        "https://ailinkedinpostgenerator.krishaiworks.com/#webapplication",
      name: "AI LinkedIn Post Generator",
      url: "https://ailinkedinpostgenerator.krishaiworks.com/",
      description:
        "Generate professional LinkedIn posts, engaging hooks, and relevant hashtags with AI. Create LinkedIn content in seconds with KrishAIWorks.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
    },

    {
      "@type": "WebPage",
      "@id":
        "https://ailinkedinpostgenerator.krishaiworks.com/#webpage",
      url: "https://ailinkedinpostgenerator.krishaiworks.com/",
      name: "AI LinkedIn Post Generator | Create Engaging LinkedIn Posts",
      description:
        "Generate professional LinkedIn posts, engaging hooks, and relevant hashtags with AI. Create LinkedIn content in seconds with KrishAIWorks.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      about: {
        "@id":
          "https://ailinkedinpostgenerator.krishaiworks.com/#webapplication",
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS6TSMM1ZR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BS6TSMM1ZR');
          `}
        </Script>
      </body>
    </html>
  );
}