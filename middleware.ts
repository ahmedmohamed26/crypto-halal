import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales, localePrefix } from "./i18n.config";

const COOKIE_NAME = "NEXT_LOCALE";

export default function middleware(req: NextRequest) {
  const cookieLocale = req.cookies.get(COOKIE_NAME)?.value;

  let detectedLocale = cookieLocale || defaultLocale;

  if (!locales.includes(detectedLocale as typeof defaultLocale)) {
    detectedLocale = defaultLocale;
  }

  if (
    !cookieLocale ||
    !locales.includes(cookieLocale as typeof defaultLocale)
  ) {
    const response = NextResponse.redirect(
      new URL(req.url, req.nextUrl.origin)
    );
    response.cookies.set(COOKIE_NAME, detectedLocale);
    return response;
  }

  return createMiddleware({
    defaultLocale,
    locales,
    localePrefix,
    localeDetection: true,
  })(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
