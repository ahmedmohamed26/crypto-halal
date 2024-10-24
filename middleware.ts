import createMiddleware from "next-intl/middleware";
import { localePrefix, locales } from "./i18n.config";

export default createMiddleware({
  defaultLocale: "ar",
  locales,
  localePrefix,
  localeDetection: true,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
