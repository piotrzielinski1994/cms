'use client';

import { Button } from '@/components/basic/button/button';
import Form from '@/components/basic/form/root/form';
import { TextAreaContainer } from '@/components/basic/form/text-area/text-area';
import { TextInputContainer } from '@/components/basic/form/text-input/text-input';
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
      <Form.Group>
        <Form.Label htmlFor={`${id}__email`}>{t('contactForm.fields.email.label')}</Form.Label>
        <TextInputContainer
          id={`${id}__email`}
          name="email"
          type="email"
          autoComplete="email"
          control={form.control}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={`${id}__message`}>{t('contactForm.fields.message.label')}</Form.Label>
        <TextAreaContainer id={`${id}__message`} name="message" control={form.control} />
      </Form.Group>
      <Button type="submit">{t('submit')}</Button>
    </Form.Root>
  );
};

export { ContactForm };
