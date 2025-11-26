'use client';

import { ContactUs } from '@/components/sections/form/contact-us/contact-us';

const ContactUsContainer = () => {
  return (
    <ContactUs
      onSubmit={(data) => {
        console.log('@@@ data | ', data);
        window.dataLayer?.push({ event: 'contact_us_submit' });
      }}
    />
  );
};

export { ContactUsContainer };
