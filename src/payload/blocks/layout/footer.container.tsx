import { Footer } from '@/components/layout/footer/footer';
import { Page } from '@/payload/payload.types';
import { getCachedGlobal } from '@/payload/utils/globals';
import { Locale } from 'next-intl';

type FooterContainerProps = {
  locale: Locale;
};

const FooterContainer = async ({ locale }: FooterContainerProps) => {
  const footerData = await getCachedGlobal('footer', locale)();
  const navItems = (footerData?.navItems ?? []).map((it) => ({
    id: it.id!,
    label: it.link.label,
    href: String((it.link.reference?.value as Page).path),
  }));

  return <Footer items={navItems} />;
};

export { FooterContainer };
