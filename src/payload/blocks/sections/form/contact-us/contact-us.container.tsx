import { ContactUs } from '@/components/sections/form/contact-us/contact-us';

const ContactUsContainer = () => {
  return <ContactUs onSubmit={(data) => console.log('@@@ data | ', data)} />;
};

export { ContactUsContainer };
