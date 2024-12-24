import { Logo } from '@/_old/components/Logo/Logo';
import { cn } from '@/_old/utilities/cn';
import { getCachedGlobal } from '@/_old/utilities/getGlobals';
import Container from '@/components/layout/container/container';
import Section from '@/components/layout/section/section';
import { Link } from '@/payload/locale/routing';
import { FooterProps } from './footer.types';

export async function Footer({ locale }: FooterProps) {
  const footerData = await getCachedGlobal('footer', locale)();
  const navItems = (footerData?.navItems ?? []).map((it) => ({
    id: it.id,
    label: it.link.label,
    path: `/${it.link.reference?.value.slug}`,
  }));

  return (
    <Section as="footer" className="mt-auto bg-red-600">
      <Container className={cn('flex items-center')}>
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>
        <nav className="flex-grow flex justify-end ">
          {navItems.map(({ id, label, path }) => {
            return (
              <Link key={id} className="p-2" href={path}>
                {label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </Section>
  );
}
