import { Logo } from '@/_old/components/Logo/Logo';
import { getCachedGlobal } from '@/_old/utilities/getGlobals';
import { cn } from '@/_old/utilities/ui';
import Container from '@/components/layout/container/container';
import Section from '@/components/layout/section/section';
import { Link } from '@/payload/locale/routing';
import { FooterProps } from './footer.types';

export async function Footer({ locale }: FooterProps) {
  const footerData = await getCachedGlobal('footer', locale)();
  const navItems = (footerData?.navItems ?? []).map((it) => ({
    id: it.id,
    label: it.link.label,
    // @ts-expect-error
    path: `/${it.link.reference?.value.slug}`,
  }));

  return (
    <Section as="footer" className="mt-auto py-5 bg-accent">
      <Container className={cn('flex items-center')}>
        <Link className="flex items-center" href="/">
          <Logo />
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
}
