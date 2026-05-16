'use client';

import { PropsWithChildren, createContext, useContext } from 'react';

type EcommerceLinks = {
  checkoutHref: string | null;
};

const EcommerceLinksContext = createContext<EcommerceLinks>({ checkoutHref: null });

type EcommerceLinksProviderProps = PropsWithChildren<{ links?: EcommerceLinks }>;

const EcommerceLinksProvider = ({ links, children }: EcommerceLinksProviderProps) => {
  const value = links ?? { checkoutHref: null };
  return <EcommerceLinksContext.Provider value={value}>{children}</EcommerceLinksContext.Provider>;
};

const useEcommerceLinks = () => useContext(EcommerceLinksContext);

export { EcommerceLinksProvider, useEcommerceLinks };
