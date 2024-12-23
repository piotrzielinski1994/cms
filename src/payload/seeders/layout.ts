import { Page } from '@/payload/payload.types';
import { Payload } from 'payload';

const getLayoutItems = (pages: Page[]) => {
  const navItems = pages.map((it) => ({
    link: {
      type: 'reference',
      label: it.title,
      reference: {
        relationTo: 'pages',
        value: it.id,
      },
    },
  }));
  return [
    { slug: 'header', data: { navItems } },
    { slug: 'footer', data: { navItems } },
  ];
};

export const seedLayoutItems = (pages: Page[]) => async (payload: Payload) => {
  return Promise.all(getLayoutItems(pages).map((it) => payload.updateGlobal(it)));
};
