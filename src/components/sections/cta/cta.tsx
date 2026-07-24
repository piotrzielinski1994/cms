import type { ComponentProps } from 'react';
import { ButtonLink } from '@/components/basic/button/button';
import { Card } from '@/components/basic/card/card';
import { Container } from '@/components/basic/container/container';
import { Section } from '@/components/basic/section/section';
import type { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';

type CtaProps = HtmlProps<'section'> & {
  heading?: string;
  subheading?: string;
  buttons?: Array<Pick<ComponentProps<typeof ButtonLink>, 'href' | 'variant'> & { label: string }>;
};

const Cta = ({ heading, subheading, buttons = [], className, ...rest }: CtaProps) => {
  return (
    <Section {...rest} className={cn('py-10', className)}>
      <Container>
        <Card
          header={heading && <h2 className={cn('text-4xl font-semibold')}>{heading}</h2>}
          footer={
            buttons.length > 0 && (
              <div className="flex gap-4">
                {buttons.map((button) => {
                  return (
                    <ButtonLink key={button.label} href={button.href} variant={button.variant}>
                      {button.label}
                    </ButtonLink>
                  );
                })}
              </div>
            )
          }
        >
          {subheading && <p>{subheading}</p>}
        </Card>
      </Container>
    </Section>
  );
};

export { Cta };
