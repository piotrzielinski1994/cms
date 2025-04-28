import { ButtonLink } from '@/components/basic/button';
import { ContactForm } from '@/components/blocks/form/contact-form/contact-form';
import { Container } from '@/components/layout/container/container';
import { Section } from '@/components/layout/section/section';
import { Hero1Block, Page } from '@/payload/payload.types';
import { cn } from '@/utils/tailwind';

const Hero1 = ({ heading, subheading, buttons }: Hero1Block) => {
  return (
    <Section>
      <Container
        className={cn('py-10', 'justify-items-start content-center gap-4', 'bg-background1')}
      >
        <h1 className={cn('text-6xl font-semibold')}>{heading}</h1>
        <ContactForm />
        {subheading && <p>{subheading}</p>}
        {buttons?.map((button) => {
          const path = (button?.reference?.value as Page).path;
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

export { Hero1 };
