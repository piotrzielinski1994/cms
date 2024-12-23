import { getCachedGlobal } from '@/_old/utilities/getGlobals';
import { HeaderClient } from './header.client';
import { HeaderProps } from './header.types';

export async function Header({ locale }: HeaderProps) {
  const headerData = await getCachedGlobal('header', locale)();
  return <HeaderClient data={headerData} />;
}
