import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
const ProtectedPage = dynamic(() => import("@/app/_components/ProtectedPage"));
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
    title: t("paymentTitle"),
  };
}
const PageLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <ProtectedPage> {children}</ProtectedPage>
    </main>
  );
};
export default PageLayout;
