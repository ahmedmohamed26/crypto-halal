import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");

  return <div> {t("title")}</div>;
}
