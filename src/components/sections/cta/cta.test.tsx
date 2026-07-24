import { cleanup, render, waitFor } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { withProviders } from '@/utils/tests';
import { Cta } from './cta';

// Default composed render: heading + subheading + two buttons (used by a11y + snapshot).
const defaultProps = {
  heading: 'Ready?',
  subheading: 'Start today',
  buttons: [
    { label: 'Get started', href: '/a', variant: 'primary' },
    { label: 'Learn more', href: '/b', variant: 'secondary' },
  ],
} satisfies ComponentProps<typeof Cta>;

describe('Cta', () => {
  // TC-001 -> AC-001, AC-002, AC-003, AC-004
  it('should render Section > Container > Card with heading in the header, subheading in the body and buttons in the footer when all props are provided', () => {
    const { getByRole, container } = render(withProviders(<Cta {...defaultProps} />));

    // Exactly one <section> is the root; the Card surface is a single <article>.
    expect(container.querySelectorAll('section')).toHaveLength(1);
    const article = getByRole('article');

    // Card is nested inside the Container, which is nested inside the Section.
    const containerEl = article.closest('.cms-container');
    expect(containerEl).not.toBeNull();
    const sectionEl = containerEl?.closest('section');
    expect(sectionEl).not.toBeNull();
    expect(sectionEl?.classList.contains('cms-section')).toBe(true);

    // Heading renders as an <h2> inside the Card header slot.
    const heading = getByRole('heading', { level: 2, name: 'Ready?' });
    const header = article.querySelector('header');
    expect(header).not.toBeNull();
    expect(header).toContainElement(heading);

    // Subheading renders as a <p> in the Card body (not inside header or footer).
    const paragraph = article.querySelector('p');
    expect(paragraph).not.toBeNull();
    expect(paragraph).toHaveTextContent('Start today');
    expect(header?.contains(paragraph)).toBe(false);

    // Both buttons render as links inside the Card footer, in source order,
    // each carrying its own href and label.
    const footer = article.querySelector('footer');
    expect(footer).not.toBeNull();
    expect(footer?.contains(paragraph)).toBe(false);
    const links = footer?.querySelectorAll('a') ?? [];
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent('Get started');
    expect(links[0]).toHaveAttribute('href', '/a');
    expect(links[1]).toHaveTextContent('Learn more');
    expect(links[1]).toHaveAttribute('href', '/b');
  });

  // TC-001 (variant honouring) -> AC-004
  it('should honour the per-button variant supplied by the caller', () => {
    const { getByRole } = render(withProviders(<Cta {...defaultProps} />));

    const primary = getByRole('link', { name: 'Get started' });
    const secondary = getByRole('link', { name: 'Learn more' });

    // The button given variant "primary" carries the primary surface; the
    // "secondary" one does not (proves the component does not reassign variants).
    expect(primary.classList.contains('bg-primary')).toBe(true);
    expect(secondary.classList.contains('bg-primary')).toBe(false);
    expect(secondary.classList.contains('bg-background')).toBe(true);
  });

  // TC-002 -> AC-004, AC-005
  it('should render heading and subheading but no footer button group when buttons is empty', () => {
    const { getByRole, queryAllByRole } = render(
      withProviders(<Cta heading="H" subheading="S" buttons={[]} />),
    );

    const article = getByRole('article');
    expect(getByRole('heading', { level: 2, name: 'H' })).toBeInTheDocument();
    expect(article.querySelector('p')).toHaveTextContent('S');
    expect(article.querySelector('footer')).toBeNull();
    expect(queryAllByRole('link')).toHaveLength(0);
  });

  // TC-004 -> AC-005
  it('should render only the heading when subheading and buttons are omitted', () => {
    const { getByRole, queryAllByRole } = render(withProviders(<Cta heading="H" />));

    const article = getByRole('article');
    expect(getByRole('heading', { level: 2, name: 'H' })).toBeInTheDocument();
    // No subheading paragraph and no footer button group are emitted.
    expect(article.querySelector('p')).toBeNull();
    expect(article.querySelector('footer')).toBeNull();
    expect(queryAllByRole('link')).toHaveLength(0);
  });

  // TC-003 -> AC-005
  it('should render a single empty Card band without throwing when given no props', async () => {
    const renderEmpty = () => render(withProviders(<Cta />));
    expect(renderEmpty).not.toThrow();
    cleanup();

    const { getByRole, queryByRole, container } = renderEmpty();
    const article = getByRole('article');
    expect(article).toBeInTheDocument();
    expect(queryByRole('heading', { level: 2 })).toBeNull();
    expect(article.querySelector('header')).toBeNull();
    expect(article.querySelector('p')).toBeNull();
    expect(article.querySelector('footer')).toBeNull();

    // The empty band is still a valid, accessible surface.
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // TC-005 -> AC-002
  it('should merge caller className onto the root Section without dropping the base Section class', () => {
    const { container } = render(withProviders(<Cta className="custom-x" />));
    const section = container.querySelector('section');

    expect(section).not.toBeNull();
    expect(section?.classList.contains('cms-section')).toBe(true);
    expect(section?.classList.contains('custom-x')).toBe(true);
  });

  // AC-002 (native section prop forwarding via ...rest)
  it('should forward native section attributes to the root Section element', () => {
    const { container } = render(withProviders(<Cta id="promo" data-testid="cta-root" />));
    const section = container.querySelector('section');

    expect(section).toHaveAttribute('id', 'promo');
    expect(section).toHaveAttribute('data-testid', 'cta-root');
  });

  // TC-006 -> AC-012
  it('should have no accessibility violations for the default composed render', async () => {
    const { container } = await waitFor(() => render(withProviders(<Cta {...defaultProps} />)));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // TC-007 -> AC-012
  it('should match the snapshot for the default composed render', () => {
    const { container } = render(withProviders(<Cta {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });
});
