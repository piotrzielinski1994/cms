import { cn } from '@/_old/utilities/ui';
import ButtonLink from '@/components/basic/button-link/button-link';
import Container from '@/components/layout/container/container';
import Section from '@/components/layout/section/section';
import { Hero1Props } from './hero-1.types';

const Hero1 = ({ heading, subheading, cta }: Hero1Props) => {
  // @ts-expect-error
  const path = cta?.reference?.value.path;

  return (
    <Section>
      <Container
        className={cn(
          'border-2 border-gray-600',
          'py-10',
          'justify-items-start content-center gap-4',
        )}
      >
        <h1 className={cn('text-6xl font-semibold')}>{heading}</h1>
        {subheading && <p>{subheading}</p>}
        {cta && (
          <ButtonLink href={`${path}${cta.selector ? '#' + cta.selector : ''}`}>
            {cta.label}
          </ButtonLink>
        )}
      </Container>
    </Section>
  );
};

export default Hero1;
