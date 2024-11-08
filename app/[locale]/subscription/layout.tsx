import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

interface Params {
  params: {
    locale: string;
  };
}
interface LayoutProps {
  children: ReactNode;
}

export async function generateMetadata({ params: { locale } }: Params) {
  const t = await getTranslations({ locale, namespace: "Register" });

  return {
    title: t("signup"),
  };
}
const PageLayout: React.FC<LayoutProps> = ({ children }) => {
  return <main>{children}</main>;
};
export default PageLayout;
