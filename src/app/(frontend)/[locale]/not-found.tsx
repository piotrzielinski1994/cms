import { ButtonLink } from '@/components/basic/button';
import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { getTranslations } from 'next-intl/server';

const NotFound = async () => {
  const t = await getTranslations();
  return (
    <Section>
      <Container className="gap-2 justify-items-start">
        <p>{t('common.pageNotFound')}</p>
        <ButtonLink href="/">{t('common.goHome')}</ButtonLink>
      </Container>
    </Section>
  );
};

export default NotFound;
