import { getCachedGlobal } from '@/_old/utilities/getGlobals';
import { HeaderClient } from './header.client';

import type { Header } from '@/_old/payload.types';

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)();

  return <HeaderClient data={headerData} />;
}
