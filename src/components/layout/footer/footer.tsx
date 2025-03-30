import { getCachedGlobal } from '@/_old/utilities/getGlobals';
import { Container } from '@/components/layout/container/container';
import { Section } from '@/components/layout/section/section';
import LogoSvg from '@/icons/logo.svg';
import { Link } from '@/payload/locale/routing';
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
    // @ts-expect-error
    path: `/${it.link.reference?.value.slug}`,
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
