'use client';

import { Button } from '@/components/basic/button';
import Form from '@/components/basic/form/form';
import { TextAreaContainer } from '@/components/basic/form/text-area';
import { TextInputContainer } from '@/components/basic/form/text-input';
import { useTranslationsStore } from '@/store/translations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ContactForm = () => {
  const { contactForm: t } = useTranslationsStore();
  const id = useId();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        message: z.string().min(50).max(2_000),
      }),
    ),
  });

  return (
    <Form.Root
      onSubmit={form.handleSubmit((data) => console.log('@@@ data | ', data))}
      className="grid gap-2"
    >
      <Form.Group>
        <Form.Label htmlFor={`${id}__email`}>{t.fields.email.label}</Form.Label>
        <TextInputContainer id={`${id}__email`} name="email" control={form.control} />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={`${id}__message`}>{t.fields.message.label}</Form.Label>
        <TextAreaContainer id={`${id}__message`} name="message" control={form.control} />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form.Root>
  );
};

export { ContactForm };
