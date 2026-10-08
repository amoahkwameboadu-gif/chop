import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Chop Ghana | Taste the Vibe",
    template: "%s | Chop Ghana",
  },
  description:
    "Bold Ghanaian flavours, made fresh in Elmina. Explore the CHOP menu, current offers, and local delivery.",
  applicationName: "Chop Ghana",
  openGraph: {
    title: "Chop Ghana | Taste the Vibe",
    description: "Bold. Fresh. Unmatched. From the heart of Elmina to your doorstep.",
    images: ["/chop.png"],
    type: "website",
  },
  icons: {
    icon: "/chop.png",
    apple: "/chop.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#270404",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
