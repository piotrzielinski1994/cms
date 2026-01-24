import { ButtonLink } from '@/components/basic/button/button';
import { Container } from '@/components/basic/container/container';
import { Section } from '@/components/basic/section/section';
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
