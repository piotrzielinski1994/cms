import { serverEnv } from '@/config/env.server.config';
import { ProductsCollection } from '@/payload/collections/products/products';
import {
  adminOnlyFieldAccess,
  adminOrPublishedStatus,
  customerOnlyFieldAccess,
  isAdmin,
  isDocumentOwner,
} from '@/payload/utils/access';
import { ecommercePlugin } from '@payloadcms/plugin-ecommerce';
import { stripeAdapter } from '@payloadcms/plugin-ecommerce/payments/stripe';

const ecommerce = ecommercePlugin({
  access: {
    adminOnlyFieldAccess,
    adminOrPublishedStatus,
    customerOnlyFieldAccess,
    isAdmin,
    isDocumentOwner,
  },
  customers: {
    slug: 'users',
  },
  orders: {
    ordersCollectionOverride: ({ defaultCollection }) => ({
      ...defaultCollection,
      fields: [
        ...defaultCollection.fields,
        {
          name: 'accessToken',
          type: 'text',
          unique: true,
          index: true,
          admin: {
            position: 'sidebar',
            readOnly: true,
          },
          hooks: {
            beforeValidate: [
              ({ value, operation }) => {
                if (operation === 'create' || !value) {
                  return crypto.randomUUID();
                }
                return value;
              },
            ],
          },
        },
      ],
    }),
  },
  payments: {
    paymentMethods: [
      stripeAdapter({
        secretKey: serverEnv.stripe.secretKey ?? '',
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
        webhookSecret: serverEnv.stripe.webhooksSigningSecret ?? '',
      }),
    ],
  },
  products: {
    productsCollectionOverride: ProductsCollection,
  },
});

export { ecommerce };
