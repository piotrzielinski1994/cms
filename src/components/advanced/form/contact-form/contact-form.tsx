'use client';

import { Button } from '@/components/basic/button/button';
import { NumberInputContainer } from '@/components/basic/form/number-input/number-input';
import Form from '@/components/basic/form/root/form';
import { SelectContainer } from '@/components/basic/form/select/select';
import { TextAreaContainer } from '@/components/basic/form/text-area/text-area';
import { TextInputContainer } from '@/components/basic/form/text-input/text-input';
import { getZodErrorsMap } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ContactFormProps = {
  onSubmit: (data: z.infer<typeof schema>) => void;
};

const schema = z.object({
  email: z.string().email(),
  integer: z.number().int(),
  decimal: z.number(),
  message: z.string().min(50).max(2_000),
  options: z.string().min(1),
});

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const t = useTranslations('frontend');
  const tZod = useTranslations('zod');
  const id = useId();
  const form = useForm({
    resolver: zodResolver(schema, { errorMap: getZodErrorsMap(tZod) }),
  });

  return (
    <Form.Root onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
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
        <Form.Label htmlFor={`${id}__options`}>Options</Form.Label>
        <SelectContainer
          id={`${id}__options`}
          name="options"
          options={[1, 2, 3].map((it) => ({
            value: String(it),
            label: `Option ${it}`,
          }))}
          control={form.control}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={`${id}__integer`}>Integer</Form.Label>
        <NumberInputContainer
          id={`${id}__integer`}
          maxIntLength={2}
          name="integer"
          control={form.control}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={`${id}__decimal`}>Decimal</Form.Label>
        <NumberInputContainer
          id={`${id}__decimal`}
          name="decimal"
          control={form.control}
          mode="decimal"
          maxIntLength={5}
          maxDecimalLength={2}
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
