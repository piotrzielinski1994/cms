import { ButtonLink } from '@/components/basic/button/button';
import { cn } from '@/utils/tailwind';
import { useTranslations } from 'next-intl';

const SkipLink = () => {
  const t = useTranslations('frontend');
  return (
    <ButtonLink
      href="#main"
      className={cn(
        'fixed left-4 z-skipLink',
        '-translate-y-full focus:translate-y-4 transition-transform',
        'w-fit',
      )}
    >
      {t('component.skipLink')}
    </ButtonLink>
  );
};

export { SkipLink };
