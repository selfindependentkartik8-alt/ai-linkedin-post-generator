import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ailinkedinpostgenerator.krishaiworks.com"),

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}