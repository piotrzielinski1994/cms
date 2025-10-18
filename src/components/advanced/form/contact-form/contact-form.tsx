'use client';

import { Button } from '@/components/basic/button/button';
import Form from '@/components/basic/form/root/form';
import { TextAreaContainer } from '@/components/basic/form/text-area/text-area.container';
import { TextInputContainer } from '@/components/basic/form/text-input/text-input.container';
import { cn } from '@/utils/tailwind';
import { getZodErrorsMap } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { ComponentProps, useId } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ContactFormProps = ComponentProps<typeof Form.Root> & {
  onSubmit: (data: z.infer<typeof schema>) => void;
};

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(50).max(2_000),
});

const ContactForm = ({ onSubmit, className, ...props }: ContactFormProps) => {
  const t = useTranslations('frontend');
  const tZod = useTranslations('zod');
  const id = useId();
  const form = useForm({
    resolver: zodResolver(schema, { errorMap: getZodErrorsMap(tZod) }),
  });

  return (
    <Form.Root
      {...props}
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn('grid gap-2', className)}
      noValidate
    >
      <TextInputContainer
        id={`${id}__email`}
        name="email"
        type="email"
        autoComplete="email"
        label={t('contactForm.fields.email.label')}
        control={form.control}
      />
      <TextAreaContainer
        id={`${id}__message`}
        name="message"
        label={t('contactForm.fields.message.label')}
        control={form.control}
      />
      <Button type="submit">{t('submit')}</Button>
    </Form.Root>
  );
};

export { ContactForm };
