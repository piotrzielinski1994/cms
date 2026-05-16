import { Container } from '@/components/basic/container/container';
import { Section } from '@/components/basic/section/section';
import { getTranslations } from 'next-intl/server';

const CheckoutContainer = async () => {
  const t = await getTranslations('frontend.checkout');
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-semibold">{t('title')}</h1>
        <p className="mt-4 text-foreground/70">{t('placeholder')}</p>
      </Container>
    </Section>
  );
};

export { CheckoutContainer };
