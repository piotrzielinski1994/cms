import { type ButtonProps } from '@/_old/components/ui/button';
import { cn } from '@/_old/utilities/cn';
import { Link as i18nLink } from '@/payload/locale/routing';
import React from 'react';

import type { Page, Post } from '@/payload/payload.types';
import NextLink from 'next/link';

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant'];
  children?: React.ReactNode;
  className?: string;
  label?: string | null;
  newTab?: boolean | null;
  reference?: {
    relationTo: 'pages' | 'posts';
    value: Page | Post | string | number;
  } | null;
  size?: ButtonProps['size'] | null;
  type?: 'custom' | 'reference' | null;
  url?: string | null;
};

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props;

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url;
  console.log('@@@ ASD | ', reference?.value?.slug, href);
  if (!href) return null;
  console.log('@@@ href | ', href, url);
  const finalHref = href || url || '';
  const Link = finalHref.startsWith('/admin') ? NextLink : i18nLink;

  const size = appearance === 'link' ? 'clear' : sizeFromProps;
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {};
  console.log('@@@ url | ', url, finalHref);
  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={finalHref} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    );
  }
  return (
    // <Button asChild className={className} size={size} variant={appearance}>
    <Link className={cn(className)} href={finalHref} {...newTabProps}>
      {label && label}
      {children && children}
    </Link>
    // </Button>
  );
};
