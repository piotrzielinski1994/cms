'use client';

import { Button } from '@/components/basic/button';
import { NumberInputContainer } from '@/components/basic/form/number-input/number-input';
import Form from '@/components/basic/form/root/form';
import { SelectA } from '@/components/basic/form/select/select';
import { TextAreaContainer } from '@/components/basic/form/text-area/text-area';
import { TextInputContainer } from '@/components/basic/form/text-input/text-input';
import { getZodErrorsMap } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ContactForm = () => {
  const t = useTranslations('frontend');
  const tZod = useTranslations('zod');
  const id = useId();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        age: z.number().int(),
        message: z.string().min(50).max(2_000),
      }),
      { errorMap: getZodErrorsMap(tZod) },
    ),
  });

  return (
    <Form.Root
      onSubmit={form.handleSubmit((data) => console.log('@@@ data | ', data))}
      className="grid gap-2"
    >
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <SelectA />
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
        <Form.Label htmlFor={`${id}__age`}>Age</Form.Label>
        <NumberInputContainer id={`${id}__age`} name="age" control={form.control} />
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
