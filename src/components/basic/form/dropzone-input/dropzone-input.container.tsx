import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';
import { DropzoneInput } from './dropzone-input';

const DropzoneInputContainer = (props: ComponentProps<typeof DropzoneInput>) => {
  const { t: translations, ...rest } = props;
  const t = useTranslations('frontend.component.uploadInput');
  const defaultTranslations = {
    clickToUpload: t('clickToUpload'),
    orDragAndDrop: t('orDragAndDrop'),
    fileExtensions: t('extensions.image'),
  };

  return <DropzoneInput t={{ ...defaultTranslations, ...translations }} {...rest} />;
};

export { DropzoneInputContainer };
