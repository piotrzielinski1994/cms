'use client';

import { Button } from '@/components/basic/button';
import Form from '@/components/basic/form/form';
import { NumberInputContainer } from '@/components/basic/form/number-input';
import { TextAreaContainer } from '@/components/basic/form/text-area';
import { TextInputContainer } from '@/components/basic/form/text-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ContactForm = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        age: z.number(),
        message: z.string().min(50).max(2_000),
      }),
    ),
  });

  return (
    <Form.Root onSubmit={form.handleSubmit((data) => console.log('@@@ data | ', data))}>
      <div className="grid grid-cols-2 gap-4">
        <div className="row-span-2">
          <TextAreaContainer
            name="message"
            label="Multi row label asd asd qwe as das dzxc a sda sd qwe as das d"
            control={form.control}
          />
        </div>
        <TextInputContainer name="email" label="Label" control={form.control} />
        <NumberInputContainer
          name="age"
          label="Multi row label asd asd qwe as das dzxc a sda sd qwe as das d"
          control={form.control}
        />

        {/* <Select /> */}
      </div>
      <Button type="submit">Submit</Button>
    </Form.Root>
  );
};

export { ContactForm };
