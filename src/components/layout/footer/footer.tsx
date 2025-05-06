import { Container } from '@/components/basic/container';
import { Logo } from '@/components/basic/logo';
import { Section } from '@/components/basic/section';
import { Link } from '@/config/next.routing.config';
import { Page } from '@/payload/payload.types';
import { getCachedGlobal } from '@/payload/utils/globals';
import { cn } from '@/utils/tailwind';
import { Locale } from 'next-intl';

type FooterProps = {
  locale: Locale;
};

const Footer = async ({ locale }: FooterProps) => {
  const footerData = await getCachedGlobal('footer', locale)();
  const navItems = (footerData?.navItems ?? []).map((it) => ({
    id: it.id,
    label: it.link.label,
    path: String((it.link.reference?.value as Page).path),
  }));

  return (
    <Section as="footer" className="mt-auto py-5 bg-background1">
      <Container className={cn('flex items-center')}>
        <Logo className="text-2xl" />
        <nav className="flex-grow flex justify-end ">
          <ul className="contents">
            {navItems.map(({ id, label, path }) => {
              return (
                <li key={id} className="contents">
                  <Link className="p-2" href={path}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </Section>
  );
};

export { Footer };
