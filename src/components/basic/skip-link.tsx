import { useTranslationsStore } from '@/store/translations';
import { cn } from '@/utils/tailwind';
import { ButtonLink } from './button';

const SkipLink = () => {
  const t = useTranslationsStore();
  return (
    <ButtonLink
      href="#main"
      className={cn(
        'fixed left-4 z-skipLink',
        '-translate-y-full focus:translate-y-4 transition-transform',
        'w-fit',
      )}
    >
      {t.component.skipLink}
    </ButtonLink>
  );
};

export { SkipLink };
