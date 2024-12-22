import { getCachedGlobal } from '@/_old/utilities/getGlobals';
import Link from 'next/link';

import type { Footer } from '@/_old/payload.types';

import { CMSLink } from '@/_old/components/Link';
import { Logo } from '@/_old/components/Logo/Logo';
import { ThemeSelector } from '@/_old/providers/Theme/ThemeSelector';

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)();

  const navItems = footerData?.navItems || [];

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />;
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
}