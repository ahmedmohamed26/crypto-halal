import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n.config";

export default createMiddleware({
  defaultLocale: "ar",
  locales,
  // localeDetection: false,
  localePrefix: "never",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
  // matcher: ["/", "/(ar|en)/:path*"],
  // matcher: ["/((?!api|_next|.*\\..*).*)"],
};
