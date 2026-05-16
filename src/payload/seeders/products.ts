import { Payload, PayloadRequest, RequiredDataFromCollectionSlug } from 'payload';

const categories: RequiredDataFromCollectionSlug<'categories'>[] = [
  { title: 'Apparel', slug: 'apparel' },
  { title: 'Accessories', slug: 'accessories' },
  { title: 'Footwear', slug: 'footwear' },
];

const loremDescription = (productName: string) => ({
  root: {
    type: 'root',
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    children: [
      {
        type: 'paragraph',
        version: 1,
        direction: 'ltr',
        format: '',
        indent: 0,
        children: [
          {
            type: 'text',
            version: 1,
            text: `${productName}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
          },
        ],
      },
      {
        type: 'paragraph',
        version: 1,
        direction: 'ltr',
        format: '',
        indent: 0,
        children: [
          {
            type: 'text',
            version: 1,
            text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
          },
        ],
      },
    ],
  },
});

type ProductInput = {
  title: string;
  slug: string;
  priceInUSD: number;
  inventory: number;
  categoryIds: string[];
  variants?: {
    typeName: 'size' | 'color';
    typeLabel: string;
    options: { label: string; value: string }[];
  }[];
};

const seedProducts = async (payload: Payload, req?: PayloadRequest) => {
  payload.logger.info('Seeding categories…');

  const existingCategories = await payload.find({
    collection: 'categories',
    pagination: false,
    locale: 'en',
  });
  const existingCategoryBySlug = new Map(
    existingCategories.docs.map((doc) => [doc.slug, doc.id]),
  );

  const createdCategories = await Promise.all(
    categories.map(async (it) => {
      const existing = existingCategoryBySlug.get(it.slug);
      if (existing) return { id: existing };
      return payload.create({ collection: 'categories', depth: 0, data: it, locale: 'en' });
    }),
  );

  const apparelId = createdCategories[0]?.id;
  const accessoriesId = createdCategories[1]?.id;
  const footwearId = createdCategories[2]?.id;

  payload.logger.info('Seeding products…');
  const products: ProductInput[] = [
    {
      title: 'Sample T-Shirt',
      slug: 'sample-tshirt',
      priceInUSD: 2500,
      inventory: 100,
      categoryIds: apparelId ? [apparelId] : [],
      variants: [
        {
          typeName: 'size',
          typeLabel: 'Size',
          options: [
            { label: 'S', value: 's' },
            { label: 'M', value: 'm' },
            { label: 'L', value: 'l' },
            { label: 'XL', value: 'xl' },
          ],
        },
        {
          typeName: 'color',
          typeLabel: 'Color',
          options: [
            { label: 'Black', value: 'black' },
            { label: 'White', value: 'white' },
          ],
        },
      ],
    },
    {
      title: 'Sample Hat',
      slug: 'sample-hat',
      priceInUSD: 1800,
      inventory: 50,
      categoryIds: accessoriesId ? [accessoriesId] : [],
      variants: [
        {
          typeName: 'color',
          typeLabel: 'Color',
          options: [
            { label: 'Black', value: 'black' },
            { label: 'Navy', value: 'navy' },
            { label: 'Beige', value: 'beige' },
          ],
        },
      ],
    },
    {
      title: 'Sample Hoodie',
      slug: 'sample-hoodie',
      priceInUSD: 5500,
      inventory: 30,
      categoryIds: apparelId ? [apparelId] : [],
      variants: [
        {
          typeName: 'size',
          typeLabel: 'Size',
          options: [
            { label: 'S', value: 's' },
            { label: 'M', value: 'm' },
            { label: 'L', value: 'l' },
          ],
        },
      ],
    },
    {
      title: 'Sample Sneakers',
      slug: 'sample-sneakers',
      priceInUSD: 8900,
      inventory: 20,
      categoryIds: footwearId ? [footwearId] : [],
      variants: [
        {
          typeName: 'size',
          typeLabel: 'Size',
          options: [
            { label: '40', value: '40' },
            { label: '41', value: '41' },
            { label: '42', value: '42' },
            { label: '43', value: '43' },
            { label: '44', value: '44' },
          ],
        },
        {
          typeName: 'color',
          typeLabel: 'Color',
          options: [
            { label: 'White', value: 'white' },
            { label: 'Black', value: 'black' },
          ],
        },
      ],
    },
    {
      title: 'Sample Backpack',
      slug: 'sample-backpack',
      priceInUSD: 4200,
      inventory: 40,
      categoryIds: accessoriesId ? [accessoriesId] : [],
      variants: [
        {
          typeName: 'color',
          typeLabel: 'Color',
          options: [
            { label: 'Black', value: 'black' },
            { label: 'Olive', value: 'olive' },
            { label: 'Navy', value: 'navy' },
          ],
        },
      ],
    },
  ];

  for (const product of products) {
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: product.slug } },
      limit: 1,
      locale: 'en',
    });
    if (existing.docs.length > 0) continue;

    const variantTypeIds: string[] = [];
    const variantOptionsByType: { typeId: string; optionIds: string[] }[] = [];

    for (const vt of product.variants ?? []) {
      const createdType = await payload.create({
        collection: 'variantTypes',
        depth: 0,
        data: { name: vt.typeName, label: vt.typeLabel },
      });
      variantTypeIds.push(createdType.id);

      const optionIds: string[] = [];
      for (const opt of vt.options) {
        const createdOpt = await payload.create({
          collection: 'variantOptions',
          depth: 0,
          data: {
            variantType: createdType.id,
            label: opt.label,
            value: opt.value,
          },
        });
        optionIds.push(createdOpt.id);
      }
      variantOptionsByType.push({ typeId: createdType.id, optionIds });
    }

    const createdProduct = await payload.create({
      collection: 'products',
      depth: 0,
      locale: 'en',
      data: {
        title: product.title,
        slug: product.slug,
        _status: 'published',
        enableVariants: variantTypeIds.length > 0,
        variantTypes: variantTypeIds,
        priceInUSD: product.priceInUSD,
        inventory: product.inventory,
        categories: product.categoryIds,
        description: loremDescription(product.title),
      },
    });

    if (variantOptionsByType.length > 0) {
      const cartesian = variantOptionsByType.reduce<string[][]>(
        (acc, group) => acc.flatMap((combo) => group.optionIds.map((id) => [...combo, id])),
        [[]],
      );

      for (const combo of cartesian) {
        await payload.create({
          collection: 'variants',
          depth: 0,
          req,
          data: {
            product: createdProduct.id,
            options: combo,
            inventory: 10,
            priceInUSDEnabled: true,
            priceInUSD: product.priceInUSD,
          },
        });
      }
    }
  }
};

export { seedProducts };
