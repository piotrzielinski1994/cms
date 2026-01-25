import { Container } from '@/components/basic/container/container';
import { LogoContainer } from '@/components/basic/logo/logo.container';
import { Section } from '@/components/basic/section/section';
import { Link } from '@/config/next.routing.config';
import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';

type FooterProps = HtmlProps<'footer'> & {
  items: Array<{
    id: string;
    label: string;
    href: string;
  }>;
};

const styles = {
  root: 'mt-auto py-5 bg-background1',
  container: cn('sm:px-6', 'flex items-center'),
  logo: 'text-2xl',
  nav: 'flex-grow flex justify-end',
  list: 'contents',
  item: 'contents',
  link: 'p-2',
} as const;

const Footer = ({ items, className, ...rest }: FooterProps) => {
  return (
    <Section {...rest} as="footer" className={cn(styles.root, className)}>
      <Container className={styles.container}>
        <LogoContainer className={styles.logo} />
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {items.map(({ id, label, href }) => {
              return (
                <li key={id} className={styles.item}>
                  <Link className={styles.link} href={href}>
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

export { Footer, styles };
