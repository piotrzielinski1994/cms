'use client';

import Form from '@/components/basic/form/form';
import { TextInputContainer } from '@/components/basic/form/text-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ContactForm = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        firstName: z.string(),
      }),
    ),
  });

  return (
    <Form.Root onSubmit={form.handleSubmit((data) => console.log('@@@ data | ', data))}>
      <div className="grid grid-cols-3">
        <TextInputContainer name="email" label="Label" control={form.control} />
        <TextInputContainer
          name="firstName"
          label="Multi row label asd asd qwe as das dzxc a sda sd qwe as das d"
          control={form.control}
        />
      </div>
      <button>Submit</button>
    </Form.Root>
  );
};

export { ContactForm };
