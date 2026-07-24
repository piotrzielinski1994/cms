import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { Link as RouteLink } from '@/config/next.routing.config';
import type { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';

type PaginationT = {
  label: string;
  previous: string;
  next: string;
  morePages: string;
};

type PaginationProps = HtmlProps<'nav'> & {
  currentPage: number;
  totalPages: number;
  getHref: (page: number) => string;
  siblingCount?: number;
  t: PaginationT;
};

type PageToken = number | 'ellipsis';

const styles = {
  root: cn('mx-auto flex w-full justify-center'),
  list: cn('flex flex-row items-center gap-1'),
  item: cn(''),
  link: cn(
    'flex h-9 min-w-9 items-center justify-center px-3',
    'border border-solid border-foreground/15',
    'hover:bg-background1',
    'focus-visible:tw-cms-outline',
  ),
  linkActive: cn('bg-primary text-primary-foreground border-primary'),
  disabled: cn('text-foreground/40 cursor-not-allowed hover:bg-transparent'),
  ellipsis: cn('flex h-9 w-9 items-center justify-center'),
} as const;

const buildRange = (currentPage: number, totalPages: number, siblingCount: number): PageToken[] => {
  const threshold = 2 * siblingCount + 5;
  if (totalPages <= threshold) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const clamp = (page: number) => Math.min(Math.max(page, 1), totalPages);
  const shown = new Set<number>([1, totalPages]);
  for (let page = currentPage - siblingCount; page <= currentPage + siblingCount; page += 1) {
    shown.add(clamp(page));
  }

  const sorted = [...shown].sort((a, b) => a - b);
  return sorted.reduce<PageToken[]>((tokens, page, index) => {
    const previous = sorted[index - 1];
    if (index > 0 && page - previous > 1) tokens.push('ellipsis');
    tokens.push(page);
    return tokens;
  }, []);
};

const Root = ({ className, ...rest }: HtmlProps<'nav'>) => {
  return <nav {...rest} className={cn(styles.root, className)} />;
};

const Content = ({ className, ...rest }: HtmlProps<'ul'>) => {
  return <ul {...rest} className={cn(styles.list, className)} />;
};

const Item = ({ className, ...rest }: HtmlProps<'li'>) => {
  return <li {...rest} className={cn(styles.item, className)} />;
};

const Link = ({ className, ...rest }: ComponentProps<typeof RouteLink>) => {
  const isActive = rest['aria-current'] === 'page';
  return (
    <RouteLink {...rest} className={cn(styles.link, isActive && styles.linkActive, className)} />
  );
};

type BoundaryProps = HtmlProps<'span'> & {
  href?: string;
  disabled?: boolean;
  label: string;
  icon: ReactNode;
};

const Boundary = ({ href, disabled, label, icon, className, ...rest }: BoundaryProps) => {
  if (disabled || !href) {
    return (
      <span
        {...rest}
        aria-disabled="true"
        tabIndex={-1}
        className={cn(styles.link, styles.disabled, className)}
      >
        {icon}
        <span className="sr-only">{label}</span>
      </span>
    );
  }
  return (
    <RouteLink href={href} aria-label={label} className={cn(styles.link, className)}>
      {icon}
    </RouteLink>
  );
};

const Previous = ({ className, ...rest }: Omit<BoundaryProps, 'icon'>) => {
  return <Boundary {...rest} icon={<ChevronLeft className="h-4 w-4" />} className={className} />;
};

const Next = ({ className, ...rest }: Omit<BoundaryProps, 'icon'>) => {
  return <Boundary {...rest} icon={<ChevronRight className="h-4 w-4" />} className={className} />;
};

const Ellipsis = ({ label, className, ...rest }: HtmlProps<'span'> & { label?: ReactNode }) => {
  return (
    <span {...rest} aria-hidden="true" className={cn(styles.ellipsis, className)}>
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">{label}</span>
    </span>
  );
};

const Component = ({
  currentPage,
  totalPages,
  getHref,
  siblingCount = 1,
  t,
  className,
  ...rest
}: PaginationProps) => {
  const tokens = buildRange(currentPage, totalPages, siblingCount);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <Root {...rest} aria-label={t.label} className={className}>
      <Content>
        <Item>
          <Previous
            label={t.previous}
            disabled={isFirst}
            href={isFirst ? undefined : getHref(currentPage - 1)}
          />
        </Item>
        {tokens.map((token, index) => (
          <Item key={token === 'ellipsis' ? `ellipsis-${index}` : `page-${token}`}>
            {token === 'ellipsis' ? (
              <Ellipsis label={t.morePages} />
            ) : (
              <Link href={getHref(token)} aria-current={token === currentPage ? 'page' : undefined}>
                {token}
              </Link>
            )}
          </Item>
        ))}
        <Item>
          <Next
            label={t.next}
            disabled={isLast}
            href={isLast ? undefined : getHref(currentPage + 1)}
          />
        </Item>
      </Content>
    </Root>
  );
};

const Pagination = Object.assign(Component, {
  Root,
  Content,
  Item,
  Link,
  Previous,
  Next,
  Ellipsis,
});

export { Pagination, styles };
