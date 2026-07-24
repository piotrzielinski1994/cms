import { cleanup, render, waitFor } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { withProviders } from '@/utils/tests';
import { Testimonials } from './testimonials';

// Default composed render: heading + subheading + two items (one with an
// annotation, one without). Reused by the a11y (TC-007) and snapshot (TC-008)
// cases so all three exercise the same DOM.
const defaultProps = {
  heading: 'What our customers say',
  subheading: 'Trusted worldwide',
  items: [
    { image: '/a.webp', quote: 'Q1', name: 'Ann', annotation: 'CEO' },
    { image: '/b.webp', quote: 'Q2', name: 'Bob' },
  ],
} satisfies ComponentProps<typeof Testimonials>;

describe('Testimonials', () => {
  // TC-001 -> AC-001, AC-002, AC-003, AC-004
  it('should render Section > Container with a centered header and two Testimonial figures in source order when heading, subheading and items are all provided', () => {
    const { container, getByRole } = render(withProviders(<Testimonials {...defaultProps} />));

    // Exactly one <section> is the root, carrying the base Section class.
    expect(container.querySelectorAll('section')).toHaveLength(1);
    const section = container.querySelector('section');
    expect(section?.classList.contains('cms-section')).toBe(true);

    // The Container is nested inside the Section.
    const containerEl = section?.querySelector('.cms-container');
    expect(containerEl).not.toBeNull();

    // A centered <header> holds the <h2> heading and the subheading <p>.
    const header = containerEl?.querySelector('header');
    expect(header).not.toBeNull();
    expect(header?.classList.contains('text-center')).toBe(true);
    const heading = getByRole('heading', { level: 2, name: 'What our customers say' });
    expect(header).toContainElement(heading);
    expect(header?.querySelector('p')).toHaveTextContent('Trusted worldwide');

    // Exactly two Testimonial <figure>s render, in source order.
    const figures = container.querySelectorAll('figure');
    expect(figures).toHaveLength(2);

    // First figure carries quote "Q1", name "Ann" and annotation "CEO"
    // (a figcaption with two <span>s: name + annotation).
    expect(figures[0]).toHaveTextContent('Q1');
    expect(figures[0]).toHaveTextContent('Ann');
    expect(figures[0]).toHaveTextContent('CEO');
    expect(figures[0].querySelectorAll('figcaption span')).toHaveLength(2);

    // Second figure carries quote "Q2", name "Bob" and NO annotation
    // (a figcaption with a single <span>: just the name).
    expect(figures[1]).toHaveTextContent('Q2');
    expect(figures[1]).toHaveTextContent('Bob');
    expect(figures[1].querySelectorAll('figcaption span')).toHaveLength(1);
  });

  // TC-002 -> AC-005, AC-004
  it('should render the item figures but no header when heading and subheading are both omitted', () => {
    const { container, queryByRole } = render(
      withProviders(<Testimonials items={[{ image: '/a.webp', quote: 'Q', name: 'Ann' }]} />),
    );

    // No header / heading is emitted.
    expect(container.querySelector('header')).toBeNull();
    expect(queryByRole('heading', { level: 2 })).toBeNull();

    // The single Testimonial figure still renders.
    const figures = container.querySelectorAll('figure');
    expect(figures).toHaveLength(1);
    expect(figures[0]).toHaveTextContent('Ann');
  });

  // TC-003 -> AC-005
  it('should render a single empty band without throwing and with no a11y violations when given no props', async () => {
    const renderEmpty = () => render(withProviders(<Testimonials />));
    expect(renderEmpty).not.toThrow();
    cleanup();

    const { container, queryByRole } = renderEmpty();

    // Section > Container renders, but with no header and no figures.
    expect(container.querySelectorAll('section')).toHaveLength(1);
    expect(container.querySelector('.cms-container')).not.toBeNull();
    expect(container.querySelector('header')).toBeNull();
    expect(queryByRole('heading', { level: 2 })).toBeNull();
    expect(container.querySelectorAll('figure')).toHaveLength(0);

    // The empty band is still a valid, accessible surface.
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // TC-004 -> AC-005, AC-003
  it('should render the header but zero figures when a heading and subheading are given with an empty items array', () => {
    const { container, getByRole } = render(
      withProviders(<Testimonials heading="H" subheading="S" items={[]} />),
    );

    const header = container.querySelector('header');
    expect(header).toContainElement(getByRole('heading', { level: 2, name: 'H' }));
    expect(header?.querySelector('p')).toHaveTextContent('S');
    expect(container.querySelectorAll('figure')).toHaveLength(0);
  });

  // TC-005 -> AC-005
  it('should render only the heading inside the header when subheading and items are omitted', () => {
    const { container, getByRole } = render(withProviders(<Testimonials heading="H" />));

    const header = container.querySelector('header');
    expect(header).toContainElement(getByRole('heading', { level: 2, name: 'H' }));
    // No subheading paragraph inside the header and no figures.
    expect(header?.querySelector('p')).toBeNull();
    expect(container.querySelectorAll('figure')).toHaveLength(0);
  });

  // TC-006 -> AC-002
  it('should merge caller className onto the root Section and forward native section props', () => {
    const { container } = render(withProviders(<Testimonials className="custom-x" id="proof" />));
    const section = container.querySelector('section');

    // Base Section class is kept AND the caller class is merged (cn merge).
    expect(section?.classList.contains('cms-section')).toBe(true);
    expect(section?.classList.contains('custom-x')).toBe(true);
    // Native section attribute is forwarded via ...rest.
    expect(section).toHaveAttribute('id', 'proof');
  });

  // TC-007 -> AC-012
  it('should have no accessibility violations for the default composed render', async () => {
    const { container } = await waitFor(() =>
      render(withProviders(<Testimonials {...defaultProps} />)),
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // TC-008 -> AC-012
  it('should match the snapshot for the default composed render', () => {
    const { container } = render(withProviders(<Testimonials {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });
});
