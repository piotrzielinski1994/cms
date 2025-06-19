import { Container } from '@/components/basic/container';
import { Logo } from '@/components/basic/logo';
import { Section } from '@/components/basic/section';
import { Link } from '@/config/next.routing.config';
import { cn } from '@/utils/tailwind';

type FooterProps = {
  items: Array<{
    id: string;
    label: string;
    path: string;
  }>;
};

const Footer = ({ items }: FooterProps) => {
  return (
    <Section as="footer" className="mt-auto py-5 bg-background1">
      <Container className={cn('flex items-center')}>
        <Logo className="text-2xl" />
        <nav className="flex-grow flex justify-end ">
          <ul className="contents">
            {items.map(({ id, label, path }) => {
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
