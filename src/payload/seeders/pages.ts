import { Page } from '@/payload/payload.types';
import { Payload, RequiredDataFromCollectionSlug } from 'payload';

const generateSubpages = (parentId: Page['id']): RequiredDataFromCollectionSlug<'pages'>[] => [
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
    parent: parentId,
  },
];

export const seedPages = async (payload: Payload) => {
  const homePage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: {
      slug: '',
      slugLock: false,
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
  });
  return Promise.all(
    generateSubpages(homePage.id).map((it) =>
      payload.create({ collection: 'pages', depth: 0, data: it }),
    ),
  );
};
