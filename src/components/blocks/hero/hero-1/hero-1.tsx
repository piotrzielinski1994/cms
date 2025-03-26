import { cn } from '@/_old/utilities/ui';
import ButtonLink from '@/components/basic/button-link/button-link';
import Container from '@/components/layout/container/container';
import Section from '@/components/layout/section/section';
import { Hero1Props } from './hero-1.types';

const Hero1 = ({ heading, subheading, buttons }: Hero1Props) => {
  return (
    <Section>
      <Container
        className={cn('py-10', 'justify-items-start content-center gap-4', 'bg-background1')}
      >
        <h1 className={cn('text-6xl font-semibold')}>{heading}</h1>
        {subheading && <p>{subheading}</p>}
        {buttons?.map((button) => {
          // @ts-expect-error
          const path = button?.reference?.value.path;
          return (
            <ButtonLink
              key={button.label}
              href={`${path}${button.selector ? '#' + button.selector : ''}`}
            >
              {button.label}
            </ButtonLink>
          );
        })}
      </Container>
    </Section>
  );
};

export default Hero1;
