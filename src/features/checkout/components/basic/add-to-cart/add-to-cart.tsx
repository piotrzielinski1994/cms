'use client';

import { Button } from '@/components/basic/button/button';
import { useCart } from '@payloadcms/plugin-ecommerce/client/react';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

type AddToCartButtonProps = {
  productId: string;
  variantId?: string;
  quantity?: number;
};

const AddToCartButton = ({ productId, variantId, quantity = 1 }: AddToCartButtonProps) => {
  const { addItem } = useCart();
  const t = useTranslations('frontend.product');
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      await addItem({ product: productId, variant: variantId }, quantity);
    });
  };

  return (
    <Button onClick={onClick} disabled={isPending}>
      {isPending ? t('adding') : t('addToCart')}
    </Button>
  );
};

export { AddToCartButton };
