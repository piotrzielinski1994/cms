import { Optional } from '@/utils/types';
import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';
import { DropzoneInput } from './dropzone-input';

const DropzoneInputContainer = (props: Optional<ComponentProps<typeof DropzoneInput>, 't'>) => {
  const t = useTranslations('frontend.component.uploadInput');
  return (
    <DropzoneInput
      t={{
        clickToUpload: t('clickToUpload'),
        orDragAndDrop: t('orDragAndDrop'),
        fileExtensions: t('extensions.image'),
      }}
      {...props}
    />
  );
};

export { DropzoneInputContainer };
