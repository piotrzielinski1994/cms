import { Payload } from 'payload';

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
          subheading: 'Home Page',
          cta: {
            label: 'CTA',
            reference: {
              relationTo: 'pages',
              value: '',
            },
          },
        },
      ],
    },
  });
  const aboutUsPage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: {
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
          subheading: 'About Us Page',
          cta: {
            label: 'CTA',
            reference: {
              relationTo: 'pages',
              value: '',
            },
          },
        },
      ],
      parent: homePage.id,
    },
  });
  const contactPage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: {
      slug: 'contact',
      _status: 'published',
      title: 'Contact',
      seo: {
        title: 'Contact',
        description: 'Contact Page Description',
      },
      sections: [
        {
          blockType: 'hero-1',
          heading: 'Contact Page',
          subheading: 'Contact Page',
          cta: {
            label: 'CTA',
            reference: {
              relationTo: 'pages',
              value: '',
            },
          },
        },
      ],
      parent: aboutUsPage.id,
    },
  });

  return [homePage, aboutUsPage, contactPage];
};
