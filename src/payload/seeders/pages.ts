import { Payload } from 'payload';
import { createPage } from './helpers/pages';

export const seedPages = async (payload: Payload) => {
  const homePage = await createPage(
    payload,
    {
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
        },
      ],
    },
    (page) => ({
      pl: {
        slug: '',
        title: 'Główna',
        seo: {
          title: 'Główna',
          description: 'Opis strony głównej',
        },
        sections: [
          {
            id: page.sections[0].id,
            blockType: 'hero-1',
            heading: 'Strona Główna',
            subheading: 'Strona Główna',
          },
        ],
      },
    }),
  );

  const aboutUsPage = await createPage(
    payload,
    {
      slug: 'about-us',
      path: '/about-us',
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
        },
      ],
      parent: homePage.id,
    },
    (page) => ({
      pl: {
        slug: 'o-nas',
        path: '/o-nas',
        title: 'O nas',
        seo: {
          title: 'O nas',
          description: 'Opis strony o nas',
        },
        sections: [
          {
            id: page.sections[0].id,
            blockType: 'hero-1',
            heading: 'Strona O Nas',
            subheading: 'Strona O Nas',
          },
        ],
        parent: homePage.id,
      },
    }),
  );

  const contactPage = await createPage(
    payload,
    {
      slug: 'contact',
      path: '/about-us/contact',
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
        },
      ],
      parent: aboutUsPage.id,
    },
    (page) => ({
      pl: {
        slug: 'kontakt',
        path: '/o-nas/kontakt',
        title: 'Kontakt',
        seo: {
          title: 'Kontakt',
          description: 'Opis strony kontakt',
        },
        sections: [
          {
            id: page.sections[0].id,
            blockType: 'hero-1',
            heading: 'Strona Kontakt',
            subheading: 'Strona Kontakt',
          },
        ],
        parent: aboutUsPage.id,
      },
    }),
  );

  return [homePage, aboutUsPage, contactPage];
};
