import { cleanup, render, waitFor } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { withProviders } from '@/utils/tests';
import { Content } from './content';

// Default composed render: heading + subheading + a single content node.
// Reused by the a11y (TC-008) and snapshot (TC-009) cases so all three exercise
// the same DOM.
const defaultProps = {
  heading: 'About us',
  subheading: 'Who we are',
  content: <p>We build tools.</p>,
} satisfies ComponentProps<typeof Content>;

describe('Content', () => {
  // TC-001 -> AC-001, AC-002, AC-003, AC-004
  it('should render Section > Container with a centered header (h2 + subheading) followed by the content node placed directly in the Container (no Card article) when heading, subheading and content are all provided', () => {
    const { container, getByRole, getByText } = render(
      withProviders(<Content {...defaultProps} />),
    );

    // Exactly one <section> is the root, carrying the base Section class.
    expect(container.querySelectorAll('section')).toHaveLength(1);
    const section = container.querySelector('section');
    expect(section?.classList.contains('cms-section')).toBe(true);

    // The Container is nested inside the Section.
    const containerEl = section?.querySelector('.cms-container');
    expect(containerEl).not.toBeNull();

    // A centered <header> holds the <h2> heading and the subheading <p>.
    const h2 = getByRole('heading', { level: 2, name: 'About us' });
    const header = h2.closest('header');
    expect(header).not.toBeNull();
    expect(header?.classList.contains('text-center')).toBe(true);
    expect(header?.querySelector('p')).toHaveTextContent('Who we are');

    // The content node renders verbatim, directly in the Container, AFTER the
    // header - it is a <p> "We build tools." that is NOT inside the header.
    const prose = getByText('We build tools.');
    expect(prose.tagName).toBe('P');
    expect(header?.contains(prose)).toBe(false);
    expect(containerEl?.contains(prose)).toBe(true);

    // The deliberate structural difference from `cta`: NO Card surface, so no
    // <article> is ever emitted (body prose flows with the page).
    expect(container.querySelectorAll('article')).toHaveLength(0);
  });

  // TC-002 -> AC-005, AC-004
  it('should render the content node but no header when heading and subheading are both omitted', () => {
    const { container, getByText, queryByRole } = render(
      withProviders(<Content content={<p>Body only.</p>} />),
    );

    // No section header and no <h2> are emitted.
    expect(container.querySelector('header')).toBeNull();
    expect(queryByRole('heading', { level: 2 })).toBeNull();

    // The prose content region still renders the passed node.
    const prose = getByText('Body only.');
    expect(container.querySelector('.cms-container')?.contains(prose)).toBe(true);
    // Still no Card surface.
    expect(container.querySelectorAll('article')).toHaveLength(0);
  });

  // TC-003 -> AC-005
  it('should render a single empty band (Section > Container, no header, no content region) without throwing and with no a11y violations when given no props', async () => {
    const renderEmpty = () => render(withProviders(<Content />));
    expect(renderEmpty).not.toThrow();
    cleanup();

    const { container, queryByRole } = renderEmpty();

    // Section > Container renders...
    expect(container.querySelectorAll('section')).toHaveLength(1);
    const containerEl = container.querySelector('.cms-container');
    expect(containerEl).not.toBeNull();

    // ...but with no header, no <h2>, and no prose content region: the empty
    // band has zero content in the Container.
    expect(container.querySelector('header')).toBeNull();
    expect(queryByRole('heading', { level: 2 })).toBeNull();
    expect(containerEl?.children.length).toBe(0);

    // The empty band is still a valid, accessible surface.
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // TC-004 -> AC-005, AC-003
  it('should render the header (h2 + subheading) but no prose content region when content is omitted', () => {
    const { container, getByRole } = render(
      withProviders(<Content heading="H" subheading="S" />),
    );

    const h2 = getByRole('heading', { level: 2, name: 'H' });
    const header = h2.closest('header');
    expect(header?.querySelector('p')).toHaveTextContent('S');

    // The Container holds ONLY the header (no content region follows it).
    const containerEl = container.querySelector('.cms-container');
    expect(containerEl?.children.length).toBe(1);
    expect(containerEl?.children[0].tagName).toBe('HEADER');
  });

  // TC-005 -> AC-005
  it('should render only the heading inside the header when subheading and content are omitted', () => {
    const { container, getByRole } = render(withProviders(<Content heading="H" />));

    const h2 = getByRole('heading', { level: 2, name: 'H' });
    const header = h2.closest('header');
    // No subheading paragraph inside the header and no prose content region.
    expect(header?.querySelector('p')).toBeNull();
    const containerEl = container.querySelector('.cms-container');
    expect(containerEl?.children.length).toBe(1);
    expect(containerEl?.children[0].tagName).toBe('HEADER');
  });

  // TC-006 -> AC-004 (content renders verbatim, including nested markup)
  it('should render the passed content node verbatim, including its nested strong/em children', () => {
    const { container, getByTestId } = render(
      withProviders(
        <Content
          content={
            <div data-testid="prose">
              <strong>Bold</strong> and <em>italic</em>.
            </div>
          }
        />,
      ),
    );

    const prose = getByTestId('prose');
    // The exact node with its nested children survived, placed in the Container.
    expect(container.querySelector('.cms-container')?.contains(prose)).toBe(true);
    expect(prose.querySelector('strong')).toHaveTextContent('Bold');
    expect(prose.querySelector('em')).toHaveTextContent('italic');
    expect(prose).toHaveTextContent('Bold and italic.');
  });

  // TC-007 -> AC-002 (className merge + native section prop forwarding via ...rest)
  it('should merge caller className onto the root Section without dropping the base class and forward native section props', () => {
    const { container } = render(withProviders(<Content className="custom-x" id="body" />));
    const section = container.querySelector('section');

    // Base Section class is kept AND the caller class is merged (cn merge).
    expect(section?.classList.contains('cms-section')).toBe(true);
    expect(section?.classList.contains('custom-x')).toBe(true);
    // Native section attribute is forwarded via ...rest.
    expect(section).toHaveAttribute('id', 'body');
  });

  // TC-008 -> AC-012
  it('should have no accessibility violations for the default composed render', async () => {
    const { container } = await waitFor(() => render(withProviders(<Content {...defaultProps} />)));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // TC-009 -> AC-012
  it('should match the snapshot for the default composed render', () => {
    const { container } = render(withProviders(<Content {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });
});
