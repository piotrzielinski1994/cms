import { Header } from '@/payload.types';
import { Payload } from 'payload';
import { createPage } from './helpers/pages';

const upsertNavItem = async (
  payload: Payload,
  slug: 'header' | 'footer',
  locale: 'en' | 'pl',
  productsPageId: string,
  label: string,
) => {
  const current = (await payload.findGlobal({ slug, locale })) as Header;
  const items = current?.navItems ?? [];
  const alreadyHas = items.some((it) => {
    const ref = it.link?.reference;
    if (ref && typeof ref.value === 'object' && ref.value !== null && 'id' in ref.value) {
      return (ref.value as { id: string }).id === productsPageId;
    }
    return ref?.value === productsPageId;
  });
  if (alreadyHas) return;

  await payload.updateGlobal({
    slug,
    locale,
    data: {
      navItems: [
        ...items,
        {
          link: {
            type: 'reference',
            label,
            reference: { relationTo: 'pages', value: productsPageId },
          },
        },
      ],
    } as Header,
  });
};

const seedProductsPages = async (payload: Payload) => {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'products' } },
    limit: 1,
    locale: 'en',
  });

  let productsPage = existing.docs[0];

  if (!productsPage) {
    const homePage = await payload
      .find({
        collection: 'pages',
        where: { slug: { equals: '' } },
        limit: 1,
        locale: 'en',
      })
      .then((it) => it.docs[0]);

    productsPage = await createPage(
      payload,
      {
        slug: 'products',
        path: '/products',
        _status: 'published',
        title: 'Products',
        seo: {
          title: 'Products',
          description: 'Browse all available products',
        },
        sections: [{ blockType: 'products-list' }],
        parent: homePage?.id,
      },
      () => ({
        pl: {
          slug: 'produkty',
          path: '/produkty',
          title: 'Produkty',
          seo: {
            title: 'Produkty',
            description: 'Przegladaj wszystkie produkty',
          },
          sections: [{ blockType: 'products-list' }],
          parent: homePage?.id,
        },
      }),
    );
  }

  await upsertNavItem(payload, 'header', 'en', productsPage.id, 'Products');
  await upsertNavItem(payload, 'footer', 'en', productsPage.id, 'Products');
  await upsertNavItem(payload, 'header', 'pl', productsPage.id, 'Produkty');
  await upsertNavItem(payload, 'footer', 'pl', productsPage.id, 'Produkty');

  return productsPage;
};

export { seedProductsPages };
