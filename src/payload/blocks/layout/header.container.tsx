import type { Locale } from 'next-intl';
import { Header } from '@/components/layout/header/header';
import type { Page } from '@/payload/payload.types';
import { getCachedGlobal } from '@/payload/utils/globals';

type HeaderContainerProps = {
  locale: Locale;
};

const HeaderContainer = async ({ locale }: HeaderContainerProps) => {
  const header = await getCachedGlobal('header', locale)();
  const navItems = (header.navItems ?? []).map((it) => ({
    id: it.id!,
    label: it.link.label,
    href: String((it.link.reference?.value as Page).path),
  }));

  return <Header items={navItems} />;
};

export { HeaderContainer };
