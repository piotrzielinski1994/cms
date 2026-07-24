import { cleanup, render, waitFor } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { withProviders } from '@/utils/tests';
import { Features } from './features';

type FeatureItem = NonNullable<ComponentProps<typeof Features>['items']>[number];

// Default composed render: heading + subheading + two items with curated icons.
// Reused by the a11y (TC-009) and snapshot (TC-010) cases so all three exercise
// the same DOM.
const defaultProps = {
  heading: 'Everything you need',
  subheading: 'Built for speed',
  items: [
    { icon: 'rocket', title: 'Fast', description: 'Ship quickly.' },
    { icon: 'shield', title: 'Secure', description: 'Safe by default.' },
  ],
} satisfies ComponentProps<typeof Features>;

describe('Features', () => {
  // TC-001 -> AC-001, AC-002, AC-003, AC-004
  it('should render Section > Container with a centered header and two feature Card articles in source order when heading, subheading and items are all provided', () => {
    const { container, getByRole } = render(withProviders(<Features {...defaultProps} />));

    // Exactly one <section> is the root, carrying the base Section class.
    expect(container.querySelectorAll('section')).toHaveLength(1);
    const section = container.querySelector('section');
    expect(section?.classList.contains('cms-section')).toBe(true);

    // The Container is nested inside the Section.
    const containerEl = section?.querySelector('.cms-container');
    expect(containerEl).not.toBeNull();

    // A centered section <header> holds the <h2> heading and the subheading <p>.
    const h2 = getByRole('heading', { level: 2, name: 'Everything you need' });
    const sectionHeader = h2.closest('header');
    expect(sectionHeader).not.toBeNull();
    expect(sectionHeader?.classList.contains('text-center')).toBe(true);
    expect(sectionHeader?.querySelector('p')).toHaveTextContent('Built for speed');

    // Exactly two feature Card <article>s render, in source order.
    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(2);

    // First card: an aria-hidden icon <svg> and the <h3> "Fast" sit in the Card
    // header; the description <p> "Ship quickly." sits in the body (not header).
    const firstHeader = articles[0].querySelector('header');
    const firstIcon = firstHeader?.querySelector('svg');
    expect(firstIcon).not.toBeNull();
    expect(firstIcon).toHaveAttribute('aria-hidden');
    expect(firstHeader?.querySelector('h3')).toHaveTextContent('Fast');
    const firstDescription = articles[0].querySelector('p');
    expect(firstDescription).toHaveTextContent('Ship quickly.');
    expect(firstHeader?.contains(firstDescription)).toBe(false);

    // Second card: icon <svg>, <h3> "Secure", body <p> "Safe by default.".
    const secondHeader = articles[1].querySelector('header');
    expect(secondHeader?.querySelector('svg')).not.toBeNull();
    expect(secondHeader?.querySelector('h3')).toHaveTextContent('Secure');
    const secondDescription = articles[1].querySelector('p');
    expect(secondDescription).toHaveTextContent('Safe by default.');
    expect(secondHeader?.contains(secondDescription)).toBe(false);
  });

  // TC-002 -> AC-005, AC-004
  it('should render the single feature Card but no header when heading and subheading are both omitted', () => {
    const { container, queryByRole } = render(
      withProviders(<Features items={[{ icon: 'zap', title: 'Quick', description: 'D' }]} />),
    );

    // No section header / h2 is emitted.
    expect(queryByRole('heading', { level: 2 })).toBeNull();
    // No centered section header (the card's own header stays inside its article).
    expect(container.querySelector('.cms-container > header')).toBeNull();

    // The single feature Card still renders with its icon, <h3> and description.
    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(1);
    expect(articles[0].querySelector('svg')).not.toBeNull();
    expect(articles[0].querySelector('h3')).toHaveTextContent('Quick');
    expect(articles[0]).toHaveTextContent('D');
  });

  // TC-003 -> AC-005
  it('should render a single empty band without throwing and with no a11y violations when given no props', async () => {
    const renderEmpty = () => render(withProviders(<Features />));
    expect(renderEmpty).not.toThrow();
    cleanup();

    const { container, queryByRole } = renderEmpty();

    // Section > Container renders, but with no header and no feature cards.
    expect(container.querySelectorAll('section')).toHaveLength(1);
    expect(container.querySelector('.cms-container')).not.toBeNull();
    expect(container.querySelector('.cms-container > header')).toBeNull();
    expect(queryByRole('heading', { level: 2 })).toBeNull();
    expect(container.querySelectorAll('article')).toHaveLength(0);

    // The empty band is still a valid, accessible surface.
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // TC-004 -> AC-005, AC-003
  it('should render the header but zero feature cards when a heading and subheading are given with an empty items array', () => {
    const { container, getByRole } = render(
      withProviders(<Features heading="H" subheading="S" items={[]} />),
    );

    const h2 = getByRole('heading', { level: 2, name: 'H' });
    const sectionHeader = h2.closest('header');
    expect(sectionHeader?.querySelector('p')).toHaveTextContent('S');
    expect(container.querySelectorAll('article')).toHaveLength(0);
  });

  // TC-005 -> AC-005
  it('should render only the heading inside the header when subheading and items are omitted', () => {
    const { container, getByRole } = render(withProviders(<Features heading="H" />));

    const h2 = getByRole('heading', { level: 2, name: 'H' });
    const sectionHeader = h2.closest('header');
    // No subheading paragraph inside the section header and no feature cards.
    expect(sectionHeader?.querySelector('p')).toBeNull();
    expect(container.querySelectorAll('article')).toHaveLength(0);
  });

  // TC-006 -> AC-004, AC-005 (item without icon AND stale/unmapped icon value)
  it('should render the card without an icon svg when the icon is omitted or is a stale unmapped value, and never throw', () => {
    // (a) icon omitted entirely.
    const { container: omitted, getByRole: getOmitted } = render(
      withProviders(<Features items={[{ title: 'No icon', description: 'D' }]} />),
    );
    const omittedArticle = omitted.querySelector('article');
    expect(getOmitted('heading', { level: 3, name: 'No icon' })).toBeInTheDocument();
    expect(omittedArticle).toHaveTextContent('D');
    expect(omittedArticle?.querySelector('svg')).toBeNull();

    cleanup();

    // (b) a stale value not present in iconMap: renders no icon, does not throw.
    const staleItem = {
      title: 'Stale',
      description: 'D',
      icon: 'totally-unmapped-icon',
    } as unknown as FeatureItem;
    const renderStale = () => render(withProviders(<Features items={[staleItem]} />));
    expect(renderStale).not.toThrow();
    cleanup();
    const { container: stale, getByRole: getStale } = renderStale();
    const staleArticle = stale.querySelector('article');
    expect(getStale('heading', { level: 3, name: 'Stale' })).toBeInTheDocument();
    expect(staleArticle?.querySelector('svg')).toBeNull();
  });

  // TC-007 -> AC-005 (item without description)
  it('should render the icon and h3 title but no body description paragraph when description is omitted', () => {
    const { container, getByRole } = render(
      withProviders(<Features items={[{ icon: 'star', title: 'Just a title' }]} />),
    );

    const article = container.querySelector('article');
    expect(article?.querySelector('svg')).not.toBeNull();
    expect(getByRole('heading', { level: 3, name: 'Just a title' })).toBeInTheDocument();
    // No body description paragraph is emitted.
    expect(article?.querySelector('p')).toBeNull();
  });

  // TC-008 -> AC-002
  it('should merge caller className onto the root Section and forward native section props', () => {
    const { container } = render(withProviders(<Features className="custom-x" id="why" />));
    const section = container.querySelector('section');

    // Base Section class is kept AND the caller class is merged (cn merge).
    expect(section?.classList.contains('cms-section')).toBe(true);
    expect(section?.classList.contains('custom-x')).toBe(true);
    // Native section attribute is forwarded via ...rest.
    expect(section).toHaveAttribute('id', 'why');
  });

  // TC-009 -> AC-012
  it('should have no accessibility violations for the default composed render', async () => {
    const { container } = await waitFor(() =>
      render(withProviders(<Features {...defaultProps} />)),
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // TC-010 -> AC-012
  it('should match the snapshot for the default composed render', () => {
    const { container } = render(withProviders(<Features {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });
});
