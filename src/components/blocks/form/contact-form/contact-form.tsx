'use client';

import { Button } from '@/components/basic/button';
import Form from '@/components/basic/form/form';
import { NumberInputContainer } from '@/components/basic/form/number-input';
import { TextAreaContainer } from '@/components/basic/form/text-area';
import { TextInputContainer } from '@/components/basic/form/text-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ContactForm = () => {
  const id = useId();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        message: z.string().min(50).max(2_000),
        subject: z.string().min(1),
        firstName: z.string().min(1),
        lastName: z.string(),
        email: z.string().email(),
        age: z.number(),
      }),
    ),
  });

  return (
    <Form.Root onSubmit={form.handleSubmit((data) => console.log('@@@ data | ', data))}>
      <div className="grid grid-cols-4 gap-4">
        <div className="row-span-4 grid grid-rows-subgrid">
          <Form.Group className="row-span-4">
            <Form.Label htmlFor={`${id}__message`}>
              message row label asd asd qwe as das dzxc a sda sd qwe as das
            </Form.Label>
            <div className="row-span-3 flex flex-col gap-2">
              <TextAreaContainer
                id={`${id}__message`}
                className="grow"
                name="message"
                control={form.control}
              />
            </div>
          </Form.Group>
        </div>
        <div className="row-span-4 grid grid-rows-subgrid">
          <Form.Group>
            <Form.Label htmlFor={`${id}__subject`}>subject</Form.Label>
            <TextInputContainer id={`${id}__subject`} name="subject" control={form.control} />
          </Form.Group>
        </div>
        <Form.Group>
          <Form.Label htmlFor={`${id}__firstName`}>firstName</Form.Label>
          <TextInputContainer id={`${id}__firstName`} name="firstName" control={form.control} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor={`${id}__lastName`}>
            lastName row label asd asd qwe as das dzxc a sda sd qwe as das
          </Form.Label>
          <TextInputContainer id={`${id}__lastName`} name="lastName" control={form.control} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor={`${id}__email`}>email</Form.Label>
          <TextInputContainer id={`${id}__email`} name="email" control={form.control} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor={`${id}__age`}>
            age row label asd asd qwe as das dzxc a sda sd qwe as das
          </Form.Label>
          <NumberInputContainer id={`${id}__age`} name="age" control={form.control} />
        </Form.Group>

        {/* <Select /> */}
      </div>
      <Button type="submit">Submit</Button>
    </Form.Root>
  );
};

export { ContactForm };
