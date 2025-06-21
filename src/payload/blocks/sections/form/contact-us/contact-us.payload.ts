import { Block } from 'payload';
import thumbnail from './contact-us.webp';

const contactUsSectionPayloadConfig = {
  slug: 'contact-us',
  interfaceName: 'ContactUsSection',
  imageURL: thumbnail.src,
  fields: [],
} satisfies Block;

export { contactUsSectionPayloadConfig };
