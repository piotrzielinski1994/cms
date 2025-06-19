import { Page } from '@/payload/payload.types';
import { getCachedGlobal } from '@/payload/utils/globals';
import { Locale } from 'next-intl';
import { Header as HeaderComponent } from './header';

type HeaderProps = {
  locale: Locale;
};

const Header = async ({ locale }: HeaderProps) => {
  const header = await getCachedGlobal('header', locale)();
  const navItems = (header.navItems ?? []).map((it) => ({
    id: it.id!,
    label: it.link.label,
    path: String((it.link.reference?.value as Page).path),
  }));

  return <HeaderComponent items={navItems} />;
};

export { Header };
