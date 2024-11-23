"use server";

import { Locale } from "@/i18n.config";
import { cookies } from "next/headers";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || "ar";
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
