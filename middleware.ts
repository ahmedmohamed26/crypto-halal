import createMiddleware from "next-intl/middleware";
import { localePrefix, locales } from "./i18n.config";
import { defaultLocale } from "./i18n";

export default createMiddleware({
  defaultLocale: defaultLocale,
  locales,
  localePrefix,
  localeDetection: true,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
