import Container from '@/components/layout/container/container';
import Section from '@/components/layout/section/section';
import { Link } from '@/payload/locale/routing';
import { Hero1Props } from './hero-1.types';

const Hero1 = ({ heading, subheading, cta }: Hero1Props) => {
  const path = cta?.reference?.value.path;

  return (
    <Section>
      <Container>
        <h1>{heading}</h1>
        {subheading && <p>{subheading}</p>}
        {cta && <Link href={`${path}${cta.selector ? '#' + cta.selector : ''}`}>{cta.label}</Link>}
      </Container>
    </Section>
  );
};

export default Hero1;
