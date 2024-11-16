import { NextUIProvider } from "@nextui-org/react";
import { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Cairo } from "next/font/google";

import { UserProvider } from "../_context/UserContext";
import useTextDirection from "../_hooks/useTextDirection";
import "./globals.css";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../_components/Footer"), {
  ssr: false,
});
const Header = dynamic(() => import("../_components/Header"), {
  ssr: false,
});
const FloatingIcon = dynamic(() => import("../_components/telegramIcon"), {
  ssr: false,
});

const cairo = Cairo({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  const title = locale === "ar" ? "كريبتو حلال" : "Crypto Halal";
  const description = "Crypto Halal";
  return {
    title,
    description,
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const dir = useTextDirection();
  const messages = useMessages();

  return (
    <html lang={locale} dir={dir}>
      <body className={cairo.className} suppressHydrationWarning={true}>
        <UserProvider>
          <NextUIProvider>
            <NextIntlClientProvider messages={messages}>
              <Header />
              <div className="mt-[100px]">
                <FloatingIcon />
                {children}
              </div>
              <Footer />
            </NextIntlClientProvider>
          </NextUIProvider>
        </UserProvider>
      </body>
    </html>
  );
}
