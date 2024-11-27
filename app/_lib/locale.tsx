"use server";

import { defaultLocale, Locale } from "@/i18n.config";
import { cookies } from "next/headers";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale(): Promise<Locale> {
  const locale = cookies()?.get(COOKIE_NAME)?.value as Locale;
  return locale || defaultLocale;
}

export async function setUserLocale(locale: Locale): Promise<void> {
  cookies().set(COOKIE_NAME, locale || defaultLocale);
}
