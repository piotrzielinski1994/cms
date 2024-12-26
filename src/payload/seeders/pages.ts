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
        },
      ],
      parent: aboutUsPage.id,
    },
  });

  return [homePage, aboutUsPage, contactPage];
};
