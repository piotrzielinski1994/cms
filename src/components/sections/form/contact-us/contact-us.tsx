import { ContactForm } from '@/components/advanced/form/contact-form/contact-form';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { cn } from '@/utils/tailwind';

const ContactUs = () => {
  return (
    <Section>
      <Container className={cn('py-10', 'bg-background1')}>
        <ContactForm />
      </Container>
    </Section>
  );
};

export { ContactUs };
