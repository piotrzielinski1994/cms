import { getCachedGlobal } from '@/_old/utilities/getGlobals';
import { HeaderClient } from './header.client';

import type { Header } from '@/payload/payload.types';
import { TypedLocale } from 'payload';

export async function Header({ locale }: { locale: TypedLocale }) {
  const headerData: Header = await getCachedGlobal('header', locale, 1)();

  return <HeaderClient data={headerData} />;
}
