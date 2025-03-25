import { Payload } from 'payload';
import { createPage } from './helpers/pages';
import { ImageBlocksBlock } from '../payload.types';
import placeholderPng from './placeholder.png';
import { createImage } from './helpers/files';

export const seedPages = async (payload: Payload) => {
  const image = await createImage(
    placeholderPng,
    {
      alt: 'Image description',
    },
    (image) => ({
      pl: {
        id: image.id,
        alt: 'Opis zdjęcia',
      },
    }),
  );
  const homePage = await createPage(
    payload,
    {
      slug: '',
      slugLock: false,
      _status: 'published',
      title: 'Home',
      seo: {
        title: 'Home',
        description: 'Home page description',
      },
      sections: [
        {
          blockType: 'hero-1',
          heading: 'Home page',
          subheading: 'Home page',
        },
        {
          blockType: 'image-blocks',
          heading: 'Image blocks heading',
          subheading: 'Image blocks subeading',
          items: [
            {
              blockType: 'image-block-1',
              image: image.id,
              heading: 'Image block 1 heading',
              subheading: 'Image block 1 subheading',
            },
            {
              blockType: 'image-block-1',
              isReversed: true,
              image: image.id,
              heading: 'Image block 1 heading',
              subheading: 'Image block 1 subheading',
            },
          ],
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
            heading: 'Strona główna',
            subheading: 'Strona główna',
          },
          {
            id: page.sections[1].id,
            blockType: 'image-blocks',
            heading: 'Nagłówek sekcji z blokami zdjęciowymi',
            subheading: 'Podnagłówek sekcji z blokami zdjęciowymi',
            items: [
              {
                id: (page.sections[1] as ImageBlocksBlock).items[0].id,
                blockType: 'image-block-1',
                heading: 'Blok zdjęciowy 1 nagłówek',
                subheading: 'Blok zdjęciowy 1 podnagłówek',
              },
              {
                id: (page.sections[1] as ImageBlocksBlock).items[1].id,
                blockType: 'image-block-1',
                heading: 'Blok zdjęciowy 1 nagłówek',
                subheading: 'Blok zdjęciowy 1 podnagłówek',
              },
            ],
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
      title: 'About us',
      seo: {
        title: 'About us',
        description: 'About us page description',
      },
      sections: [
        {
          blockType: 'hero-1',
          heading: 'About us page heading',
          subheading: 'About us page subheading',
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
            heading: 'Strona o nas',
            subheading: 'Strona o nas',
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
        description: 'Contact page description',
      },
      sections: [
        {
          blockType: 'hero-1',
          heading: 'Contact page',
          subheading: 'Contact page',
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
            heading: 'Strona kontakt',
            subheading: 'Strona kontakt',
          },
        ],
        parent: aboutUsPage.id,
      },
    }),
  );

  return [homePage, aboutUsPage, contactPage];
};
