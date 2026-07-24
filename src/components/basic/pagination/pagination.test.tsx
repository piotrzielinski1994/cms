import { render, waitFor, within } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { en } from '@/payload/locale/en';
import { withProviders } from '@/utils/tests';
import { Pagination, styles } from './pagination';

const t = en.frontend.component.pagination;

const getHref = (page: number) => `/products?page=${page}`;

const defaultProps = {
  currentPage: 3,
  totalPages: 5,
  getHref,
  t,
} satisfies ComponentProps<typeof Pagination>;

const renderPagination = (props: Partial<ComponentProps<typeof Pagination>> = {}) => {
  return render(withProviders(<Pagination {...defaultProps} {...props} />));
};

// The nav landmark is the pagination root; scope every structural query to it.
const getNav = (root: HTMLElement) => {
  const nav = root.querySelector('nav');
  if (!nav) throw new Error('no <nav> rendered');
  return nav;
};

// Previous is always the first <li>, Next always the last <li> (AC-004 source order).
const controlEl = (li: Element) => li.querySelector('a, [aria-disabled="true"]');
const prevControl = (nav: HTMLElement) => {
  const lis = nav.querySelectorAll('li');
  return controlEl(lis[0]);
};
const nextControl = (nav: HTMLElement) => {
  const lis = nav.querySelectorAll('li');
  return controlEl(lis[lis.length - 1]);
};

// Map of page-number -> anchor, keyed by the numeric anchor text (prev/next have non-numeric names).
const pageLinks = (nav: HTMLElement) => {
  const map = new Map<string, HTMLAnchorElement>();
  nav.querySelectorAll<HTMLAnchorElement>('li a').forEach((a) => {
    const text = (a.textContent ?? '').trim();
    if (/^\d+$/.test(text)) map.set(text, a);
  });
  return map;
};

// The ordered interior token sequence: page numbers and 'gap' for each ellipsis, prev/next excluded.
const pageSequence = (nav: HTMLElement) => {
  const lis = [...nav.querySelectorAll('li')];
  return lis.slice(1, -1).map((li) => {
    const a = li.querySelector('a');
    return a ? (a.textContent ?? '').trim() : 'gap';
  });
};

const ellipsisLis = (nav: HTMLElement) =>
  [...nav.querySelectorAll('li')].slice(1, -1).filter((li) => !li.querySelector('a'));

describe('Pagination', () => {
  // TC-001 (AC-001, AC-003): named import resolves + single nav landmark wrapping one <ul> of <li>.
  it('should render one nav landmark named by t.label wrapping a single ul of li items', () => {
    const { container } = renderPagination({ currentPage: 1, totalPages: 5 });

    expect(container.querySelectorAll('nav')).toHaveLength(1);

    const nav = within(container).getByRole('navigation', { name: t.label });
    const uls = nav.querySelectorAll('ul');
    expect(uls).toHaveLength(1);

    const items = [...uls[0].children];
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((child) => child.tagName === 'LI')).toBe(true);
  });

  // TC-002 (AC-003): every navigable control is an anchor; no <button> anywhere in the nav.
  it('should render navigable controls as anchors and emit no button in the nav', () => {
    const { container } = renderPagination({ currentPage: 1, totalPages: 5 });
    const nav = getNav(container);

    expect(nav.querySelector('button')).toBeNull();

    const anchors = nav.querySelectorAll('a');
    expect(anchors.length).toBeGreaterThan(0);
    anchors.forEach((a) => expect(a).toHaveAttribute('href'));
  });

  // TC-003 (AC-004, AC-007): totalPages <= 7 shows every page as a link with no ellipsis.
  it('should render every page and no ellipsis if totalPages is under the threshold', () => {
    const { container } = renderPagination({ currentPage: 3, totalPages: 5 });
    const nav = getNav(container);

    expect(pageSequence(nav)).toEqual(['1', '2', '3', '4', '5']);
    expect(ellipsisLis(nav)).toHaveLength(0);
    expect(within(nav).queryByText(t.morePages)).toBeNull();
  });

  // TC-003 (AC-007): at the threshold (totalPages === 7) all pages still render with no ellipsis,
  // even from the first page where a naive window would leave a numeric gap.
  it('should render all seven pages with no ellipsis at the threshold from the first page', () => {
    const { container } = renderPagination({ currentPage: 1, totalPages: 7 });
    const nav = getNav(container);

    expect(pageSequence(nav)).toEqual(['1', '2', '3', '4', '5', '6', '7']);
    expect(ellipsisLis(nav)).toHaveLength(0);
  });

  // TC-004 (AC-004, AC-006, AC-007): first page truncates trailing only -> 1 2 ... 10, Prev disabled.
  it('should show a trailing ellipsis and no leading ellipsis on the first page of many', () => {
    const { container } = renderPagination({ currentPage: 1, totalPages: 10 });
    const nav = getNav(container);

    expect(pageSequence(nav)).toEqual(['1', '2', 'gap', '10']);
    expect(ellipsisLis(nav)).toHaveLength(1);

    const prev = prevControl(nav);
    expect(prev?.tagName).toBe('SPAN');
    expect(prev).toHaveAttribute('aria-disabled', 'true');
  });

  // TC-005 (AC-004, AC-006, AC-007): middle page truncates both sides -> 1 ... 4 5 6 ... 10.
  it('should show both leading and trailing ellipses with navigable Prev/Next on a middle page', () => {
    const { container } = renderPagination({ currentPage: 5, totalPages: 10 });
    const nav = getNav(container);

    expect(pageSequence(nav)).toEqual(['1', 'gap', '4', '5', '6', 'gap', '10']);
    expect(ellipsisLis(nav)).toHaveLength(2);

    const prev = prevControl(nav);
    const next = nextControl(nav);
    expect(prev?.tagName).toBe('A');
    expect(prev).toHaveAttribute('href', getHref(4));
    expect(next?.tagName).toBe('A');
    expect(next).toHaveAttribute('href', getHref(6));
  });

  // TC-006 (AC-004, AC-006, AC-007): last page truncates leading only -> 1 ... 9 10, Next disabled.
  it('should show a leading ellipsis and disable Next on the last page of many', () => {
    const { container } = renderPagination({ currentPage: 10, totalPages: 10 });
    const nav = getNav(container);

    expect(pageSequence(nav)).toEqual(['1', 'gap', '9', '10']);

    const next = nextControl(nav);
    expect(next?.tagName).toBe('SPAN');
    expect(next).toHaveAttribute('aria-disabled', 'true');
  });

  // TC-007 (AC-005): exactly the current page link carries aria-current and a distinct active style.
  it('should mark only the current page link with aria-current and a distinct active style', () => {
    const { container } = renderPagination({ currentPage: 3, totalPages: 5 });
    const nav = getNav(container);
    const links = pageLinks(nav);

    expect(nav.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
    expect(links.get('3')).toHaveAttribute('aria-current', 'page');

    ['1', '2', '4', '5'].forEach((page) => {
      expect(links.get(page)).not.toHaveAttribute('aria-current');
    });

    // The active page renders a visibly distinct class list from an inactive sibling.
    expect(links.get('3')?.className).not.toBe(links.get('2')?.className);
  });

  // TC-008 (AC-004, AC-006): each control's href is exactly getHref(page).
  it('should wire each control href to getHref of its target page', () => {
    const { container } = renderPagination({ currentPage: 2, totalPages: 5 });
    const nav = getNav(container);

    expect(pageLinks(nav).get('2')).toHaveAttribute('href', '/products?page=2');
    expect(prevControl(nav)).toHaveAttribute('href', '/products?page=1');
    expect(nextControl(nav)).toHaveAttribute('href', '/products?page=3');
  });

  // TC-009 (AC-006): on the first page Prev is a non-navigable span; symmetric for Next on the last.
  it('should render a disabled boundary control as a non-focusable span without href', () => {
    const first = renderPagination({ currentPage: 1, totalPages: 5 });
    const firstNav = getNav(first.container);

    const prev = prevControl(firstNav);
    expect(prev?.tagName).toBe('SPAN');
    expect(prev).toHaveAttribute('aria-disabled', 'true');
    expect(prev).not.toHaveAttribute('href');
    expect(prev).toHaveAttribute('tabindex', '-1');
    expect(nextControl(firstNav)?.tagName).toBe('A');

    const last = renderPagination({ currentPage: 5, totalPages: 5 });
    const lastNav = getNav(last.container);

    const next = nextControl(lastNav);
    expect(next?.tagName).toBe('SPAN');
    expect(next).toHaveAttribute('aria-disabled', 'true');
    expect(next).not.toHaveAttribute('href');
    expect(next).toHaveAttribute('tabindex', '-1');
    expect(prevControl(lastNav)?.tagName).toBe('A');
  });

  // TC-010 (AC-011): the single-page boundary renders one active page link, both controls disabled.
  it('should render one active page link with both controls disabled if totalPages is 1', () => {
    const renderSingle = () => renderPagination({ currentPage: 1, totalPages: 1 });
    expect(renderSingle).not.toThrow();

    const { container } = renderSingle();
    const nav = getNav(container);

    expect(pageSequence(nav)).toEqual(['1']);
    expect(pageLinks(nav).get('1')).toHaveAttribute('aria-current', 'page');

    const prev = prevControl(nav);
    const next = nextControl(nav);
    expect(prev?.tagName).toBe('SPAN');
    expect(prev).toHaveAttribute('aria-disabled', 'true');
    expect(next?.tagName).toBe('SPAN');
    expect(next).toHaveAttribute('aria-disabled', 'true');
  });

  // TC-011 (AC-002): the compound sub-parts are independently usable when hand-composed.
  it('should render each sub-part element when hand-composed', () => {
    const { container } = render(
      withProviders(
        <Pagination.Root aria-label="Custom nav">
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Link href="/a">1</Pagination.Link>
            </Pagination.Item>
            <Pagination.Item>
              <Pagination.Ellipsis />
            </Pagination.Item>
          </Pagination.Content>
        </Pagination.Root>,
      ),
    );

    // nav > ul > li > a chain proves Root/Content/Item/Link each render their element.
    expect(within(container).getByRole('navigation', { name: 'Custom nav' })).toBeInTheDocument();
    const anchor = container.querySelector('nav > ul > li > a');
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveTextContent('1');
    expect(anchor).toHaveAttribute('href', '/a');

    // Ellipsis renders its aria-hidden span element.
    const ellipsis = container.querySelector('li [aria-hidden="true"]');
    expect(ellipsis).not.toBeNull();
    expect(ellipsis?.tagName).toBe('SPAN');
  });

  // TC-012 (AC-002, AC-010): caller className extends the base styles on root and sub-parts.
  it('should merge caller className without dropping base styles on the root and a sub-part', () => {
    const rootBase = styles.root.split(/\s+/).filter(Boolean);
    const linkBase = styles.link.split(/\s+/).filter(Boolean);

    const rootRender = renderPagination({ className: 'custom-x' });
    const nav = getNav(rootRender.container);
    rootBase.forEach((cls) => expect(nav.classList.contains(cls)).toBe(true));
    expect(nav.classList.contains('custom-x')).toBe(true);

    const linkRender = render(
      withProviders(
        <Pagination.Link className="custom-y" href="/a">
          1
        </Pagination.Link>,
      ),
    );
    const link = linkRender.container.querySelector('a');
    expect(link).not.toBeNull();
    linkBase.forEach((cls) => expect(link?.classList.contains(cls)).toBe(true));
    expect(link?.classList.contains('custom-y')).toBe(true);
  });

  // TC-013 (AC-007): the ellipsis is an aria-hidden span with an sr-only label, no href, unfocusable.
  it('should render the ellipsis as an aria-hidden span with an sr-only label and no href', () => {
    const { container } = renderPagination({ currentPage: 5, totalPages: 10 });
    const nav = getNav(container);

    const [firstGap] = ellipsisLis(nav);
    const ellipsis = firstGap.querySelector('[aria-hidden="true"]');
    expect(ellipsis).not.toBeNull();
    expect(ellipsis?.tagName).toBe('SPAN');
    expect(ellipsis).not.toHaveAttribute('href');
    expect(ellipsis).not.toHaveAttribute('tabindex', '0');

    const srOnly = firstGap.querySelector('.sr-only');
    expect(srOnly?.textContent).toBe(t.morePages);
  });

  // TC-014 (AC-013): the many-page render has no accessibility violations.
  it('should have no accessibility violations on the many-page render', async () => {
    const { container } = renderPagination({ currentPage: 5, totalPages: 10 });
    const results = await waitFor(() => axe(container));
    expect(results).toHaveNoViolations();
  });

  // TC-015 (AC-013): the default render matches the committed snapshot.
  it('should match the snapshot', () => {
    const { container } = renderPagination({ currentPage: 3, totalPages: 5 });
    expect(container).toMatchSnapshot();
  });

  // TC-016a (AC-008): labels come only from the t prop, never from a direct i18n read.
  it('should render labels from the t prop verbatim without reading i18n itself', () => {
    const sentinel = {
      label: 'SENTINEL_LABEL',
      previous: 'SENTINEL_PREV',
      next: 'SENTINEL_NEXT',
      morePages: 'SENTINEL_MORE',
    };
    const { container } = renderPagination({ currentPage: 5, totalPages: 10, t: sentinel });
    const view = within(container);

    expect(view.getByRole('navigation', { name: sentinel.label })).toBeInTheDocument();
    expect(view.getByRole('link', { name: sentinel.previous })).toBeInTheDocument();
    expect(view.getByRole('link', { name: sentinel.next })).toBeInTheDocument();
    expect(container.querySelector('.sr-only')?.textContent).toBe(sentinel.morePages);
  });
});
