'use client';

import { Button, ButtonLink } from '@/components/basic/button/button';
import { Image } from '@/components/basic/image/image';
import { usePathname } from '@/config/next.routing.config';
import { useEcommerceLinks } from '@/store/ecommerce-links';
import { cn } from '@/utils/tailwind';
import { useCart } from '@payloadcms/plugin-ecommerce/client/react';
import { ShoppingCart, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

const formatPrice = (priceInUSD?: number | null) => {
  if (typeof priceInUSD !== 'number') return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    priceInUSD / 100,
  );
};

const CartDrawer = () => {
  const { cart, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('frontend.cart');
  const pathname = usePathname();
  const { checkoutHref } = useEcommerceLinks();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const totalQuantity = useMemo(() => {
    if (!cart?.items?.length) return 0;
    return cart.items.reduce((sum, item) => (item.quantity ?? 0) + sum, 0);
  }, [cart]);

  return (
    <>
      <button
        type="button"
        aria-label={t('open')}
        onClick={() => setIsOpen(true)}
        className="relative p-2 focus-visible:tw-cms-outline"
      >
        <ShoppingCart aria-hidden />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 grid place-items-center w-5 h-5 text-xs rounded-full bg-primary text-primary-foreground">
            {totalQuantity}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <aside
            className={cn(
              'absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl',
              'flex flex-col p-4 gap-4',
            )}
            onClick={(e) => e.stopPropagation()}
            aria-label={t('title')}
          >
            <header className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{t('title')}</h2>
              <button
                type="button"
                aria-label={t('close')}
                onClick={() => setIsOpen(false)}
                className="p-2 focus-visible:tw-cms-outline"
              >
                <X aria-hidden />
              </button>
            </header>

            {!cart?.items?.length ? (
              <p className="text-center grow grid place-items-center">{t('empty')}</p>
            ) : (
              <>
                <ul className="grow overflow-auto flex flex-col gap-4">
                  {cart.items.map((item, i) => {
                    const product = item.product;
                    const variant = item.variant;
                    const productTyped =
                      typeof product === 'object' && product !== null ? product : null;
                    const title = productTyped?.title ?? `[deleted product ${product ?? ''}]`;
                    const firstImage =
                      typeof productTyped?.gallery?.[0]?.image === 'object'
                        ? productTyped?.gallery?.[0]?.image
                        : null;

                    const variantTyped =
                      typeof variant === 'object' && variant !== null ? variant : null;
                    const variantLabel = variantTyped?.options
                      ?.map((opt) => (typeof opt === 'object' ? opt.label : null))
                      .filter((it): it is string => Boolean(it))
                      .join(' / ');
                    const price = variantTyped?.priceInUSD ?? productTyped?.priceInUSD;

                    return (
                      <li key={i} className="flex gap-3 items-center">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md bg-background1 shrink-0">
                          {firstImage?.url && (
                            <Image
                              src={firstImage.url}
                              alt={firstImage.alt ?? title}
                              aspectRatio={{ width: 1, height: 1 }}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold">{title}</div>
                          {variantLabel && (
                            <div className="text-sm text-foreground/70">{variantLabel}</div>
                          )}
                          <div className="text-sm text-foreground/70">
                            {t('quantity')}: {item.quantity}
                          </div>
                          {typeof price === 'number' && (
                            <div className="text-sm">{formatPrice(price)}</div>
                          )}
                        </div>
                        <Button
                          variant="secondary"
                          onClick={() => removeItem(String(item.id ?? ''))}
                          aria-label={t('remove')}
                        >
                          {t('remove')}
                        </Button>
                      </li>
                    );
                  })}
                </ul>

                <footer className="border-t pt-4 flex flex-col gap-3">
                  {typeof cart?.subtotal === 'number' && (
                    <div className="flex justify-between font-semibold">
                      <span>{t('subtotal')}</span>
                      <span>{formatPrice(cart.subtotal)}</span>
                    </div>
                  )}
                  {checkoutHref && (
                    <ButtonLink href={checkoutHref} className="w-full text-center">
                      {t('checkout')}
                    </ButtonLink>
                  )}
                </footer>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
};

export { CartDrawer };
