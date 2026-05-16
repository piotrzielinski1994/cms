'use client';

import { clientEnv } from '@/config/env.client.config';
import { EcommerceProvider as PayloadEcommerceProvider } from '@payloadcms/plugin-ecommerce/client/react';
import { stripeAdapterClient } from '@payloadcms/plugin-ecommerce/payments/stripe';
import { PropsWithChildren } from 'react';

const EcommerceProvider = ({ children }: PropsWithChildren) => {
  return (
    <PayloadEcommerceProvider
      enableVariants={true}
      api={{
        cartsFetchQuery: {
          depth: 2,
          populate: {
            products: {
              slug: true,
              title: true,
              gallery: true,
              inventory: true,
            },
            variants: {
              title: true,
              inventory: true,
              options: true,
              priceInUSD: true,
            },
          },
        },
      }}
      paymentMethods={[
        stripeAdapterClient({
          publishableKey: clientEnv.stripe.publishableKey ?? '',
        }),
      ]}
    >
      {children}
    </PayloadEcommerceProvider>
  );
};

export { EcommerceProvider };
