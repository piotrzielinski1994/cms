import { THUMBNAIL_ID } from '@/config/storybook/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { ContactUs as ContactUsComponent } from './contact-us';

type Args = ComponentProps<typeof ContactUsComponent>;

const meta: Meta<Args> = {
  component: ContactUsComponent,
  title: 'Components/Sections/Form/ContactUs',
  argTypes: {},
  args: {},
};

const Render = (args: Args) => {
  return <ContactUsComponent {...args} id={THUMBNAIL_ID} />;
};

const ContactUs: StoryObj<typeof ContactUsComponent> = { render: Render };

export { ContactUs };
export default meta;
