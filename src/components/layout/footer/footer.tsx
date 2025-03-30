import { Container } from '@/components/layout/container/container';
import { Section } from '@/components/layout/section/section';
import { Link } from '@/config/next.routing.config';
import LogoSvg from '@/icons/logo.svg';
import { Page } from '@/payload/payload.types';
import { getCachedGlobal } from '@/payload/utils/globals';
import { cn } from '@/utils/tailwind';
import { TypedLocale } from 'payload';

type FooterProps = {
  locale: TypedLocale;
};

const Footer = async ({ locale }: FooterProps) => {
  const footerData = await getCachedGlobal('footer', locale)();
  const navItems = (footerData?.navItems ?? []).map((it) => ({
    id: it.id,
    label: it.link.label,
    path: `/${(it.link.reference?.value as Page).slug}`,
  }));

  return (
    <Section as="footer" className="mt-auto py-5 bg-background1">
      <Container className={cn('flex items-center')}>
        <Link className="flex items-center" href="/">
          <LogoSvg />
        </Link>
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
