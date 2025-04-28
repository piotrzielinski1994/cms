'use client';

import { Button } from '@/components/basic/button/button';
import Form from '@/components/basic/form/form';
import { NumberInputContainer } from '@/components/basic/form/number-input';
import Select from '@/components/basic/form/select';
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
      }),
    ),
  });

  return (
    <Form.Root onSubmit={form.handleSubmit((data) => console.log('@@@ data | ', data))}>
      <div className="grid grid-cols-3 gap-4">
        <TextInputContainer name="email" label="Label" control={form.control} />
        <NumberInputContainer
          name="age"
          label="Multi row label asd asd qwe as das dzxc a sda sd qwe as das d"
          control={form.control}
        />
        <Select />
      </div>
      <Button type="submit">Submit</Button>
    </Form.Root>
  );
};

export { ContactForm };
