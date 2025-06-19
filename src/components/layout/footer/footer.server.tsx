import { Page } from '@/payload/payload.types';
import { getCachedGlobal } from '@/payload/utils/globals';
import { Locale } from 'next-intl';
import { Footer as FooterComponent } from './footer';

type FooterProps = {
  locale: Locale;
};

const Footer = async ({ locale }: FooterProps) => {
  const footerData = await getCachedGlobal('footer', locale)();
  const navItems = (footerData?.navItems ?? []).map((it) => ({
    id: it.id!,
    label: it.link.label,
    path: String((it.link.reference?.value as Page).path),
  }));

  return <FooterComponent items={navItems} />;
};

export { Footer };
