import { Payload, RequiredDataFromCollectionSlug } from 'payload';

const pages: RequiredDataFromCollectionSlug<'pages'>[] = [
  {
    slug: '',
    _status: 'published',
    title: 'Home',
    seo: {
      title: 'Home',
      description: 'Home Page Description',
    },
    sections: [
      {
        blockType: 'hero-1',
        heading: 'Home Page',
      },
    ],
  },
  {
    slug: 'about-us',
    _status: 'published',
    title: 'About Us',
    seo: {
      title: 'About Us',
      description: 'About Us Page Description',
    },
    sections: [
      {
        blockType: 'hero-1',
        heading: 'About Us Page',
      },
    ],
  },
];

export const seedPages = async (payload: Payload) => {
  return Promise.all(
    pages.map((it) => payload.create({ collection: 'pages', depth: 0, data: it })),
  );
};
