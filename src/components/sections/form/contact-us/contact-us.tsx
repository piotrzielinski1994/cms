import { ContactForm } from '@/components/advanced/form/contact-form/contact-form';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { cn } from '@/utils/tailwind';
import { ComponentProps } from 'react';

type ContactUsProps = ComponentProps<typeof ContactForm>;

const ContactUs = ({ id, ...props }: ContactUsProps) => {
  return (
    <Section id={id}>
      <Container className={cn('py-10', 'bg-background1')}>
        <ContactForm {...props} />
      </Container>
    </Section>
  );
};

export { ContactUs };
