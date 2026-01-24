import { ButtonLink } from '@/components/basic/button/button';
import { Container } from '@/components/basic/container/container';
import { Section } from '@/components/basic/section/section';
import { cn } from '@/utils/tailwind';
import { ComponentProps, HTMLAttributes } from 'react';

type Hero1Props = HTMLAttributes<HTMLElement> & {
  heading?: string;
  subheading?: string;
  buttons?: Array<Pick<ComponentProps<typeof ButtonLink>, 'href' | 'variant'> & { label: string }>;
};

const Hero1 = ({ heading, subheading, buttons = [], ...props }: Hero1Props) => {
  return (
    <Section {...props} className={cn('px-0', props.className)}>
      <Container
        className={cn(
          'px-4 py-10 md:px-6',
          'justify-items-start content-center gap-4',
          'bg-background1',
        )}
      >
        <h1 className={cn('text-6xl font-semibold')}>{heading}</h1>
        {subheading && <p>{subheading}</p>}
        {buttons.length > 0 && (
          <div className="flex gap-4">
            {buttons.map((button) => {
              return (
                <ButtonLink key={button.label} href={button.href} variant={button.variant}>
                  {button.label}
                </ButtonLink>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
};

export { Hero1 };
