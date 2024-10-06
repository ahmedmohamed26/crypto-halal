import { Link, type Locale } from "@/i18n.config";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale() as Locale;
  return (
    <header className="...">
      <nav>
        <ul className="...">
          <li>
            <Link href="/" className="...">
              {t("home")}
            </Link>
          </li>
          <li>
            <Link href="/week" className="...">
              This week
            </Link>
          </li>
          <li>
            <Link href="/about" className="...">
              About
            </Link>
          </li>
        </ul>
      </nav>
      <LocaleSwitcher locale={locale} />
    </header>
  );
}
