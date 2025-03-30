import { getCachedGlobal } from '@/_old/utilities/getGlobals';
import { TypedLocale } from 'payload';
import { HeaderClient } from './header.client';

type HeaderProps = {
  locale: TypedLocale;
};

const Header = async ({ locale }: HeaderProps) => {
  const headerData = await getCachedGlobal('header', locale)();
  return <HeaderClient data={headerData} />;
};

export { Header };
