import { cleanup, render } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Card, styles } from './card';

// Default composed render: header + body + footer (used by a11y + snapshot).
const defaultProps = {
  header: <h2>Title</h2>,
  footer: <button type="button">Act</button>,
  children: 'Body text',
} satisfies ComponentProps<typeof Card>;

describe('Card', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Card {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', () => {
    const { container } = render(<Card {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render root, header, body and footer in source order when both props are provided', () => {
    const { getAllByRole, getByRole } = render(<Card {...defaultProps} />);

    // Exactly one root surface element.
    expect(getAllByRole('article')).toHaveLength(1);
    const article = getByRole('article');

    // A header region carrying the header content.
    const header = article.querySelector('header');
    expect(header).not.toBeNull();
    expect(header).toHaveTextContent('Title');

    // A body region carrying the children.
    expect(article).toHaveTextContent('Body text');

    // A footer region carrying the footer content (the button).
    const footer = article.querySelector('footer');
    expect(footer).not.toBeNull();
    expect(footer).toHaveTextContent('Act');
    expect(getByRole('button', { name: 'Act' })).toBeInTheDocument();

    // Header before body before footer, in source order.
    const text = article.textContent ?? '';
    expect(text.indexOf('Title')).toBeLessThan(text.indexOf('Body text'));
    expect(text.indexOf('Body text')).toBeLessThan(text.indexOf('Act'));
  });

  it('should render only the body when no header or footer props are provided', () => {
    const { getByRole } = render(<Card>Body text</Card>);
    const article = getByRole('article');

    expect(article).toHaveTextContent('Body text');
    expect(article.querySelector('header')).toBeNull();
    expect(article.querySelector('footer')).toBeNull();
  });

  it('should render an empty card surface with no regions when given no props', () => {
    const renderEmpty = () => render(<Card />);
    expect(renderEmpty).not.toThrow();
    cleanup();

    const { getByRole } = renderEmpty();
    const article = getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article.querySelector('header')).toBeNull();
    expect(article.querySelector('footer')).toBeNull();
  });

  it('should render each sub-part independently when hand-composed', () => {
    const { getByRole } = render(
      <Card.Root>
        <Card.Header>Header content</Card.Header>
        <Card.Body>Body content</Card.Body>
        <Card.Footer>Footer content</Card.Footer>
      </Card.Root>,
    );

    const article = getByRole('article');
    expect(article.querySelector('header')).toHaveTextContent('Header content');
    expect(article).toHaveTextContent('Body content');
    expect(article.querySelector('footer')).toHaveTextContent('Footer content');
  });

  it('should merge caller className without dropping base styles on the root and sub-parts', () => {
    const rootBaseClasses = styles.root.split(/\s+/).filter(Boolean);
    const headerBaseClasses = styles.header.split(/\s+/).filter(Boolean);

    const { getByRole } = render(<Card className="custom-x" />);
    const article = getByRole('article');
    rootBaseClasses.forEach((cls) => {
      expect(article.classList.contains(cls)).toBe(true);
    });
    expect(article.classList.contains('custom-x')).toBe(true);

    const { container } = render(<Card.Header className="custom-y">H</Card.Header>);
    const header = container.querySelector('header');
    expect(header).not.toBeNull();
    headerBaseClasses.forEach((cls) => {
      expect(header?.classList.contains(cls)).toBe(true);
    });
    expect(header?.classList.contains('custom-y')).toBe(true);
  });

  it('should forward arbitrary native div attributes to the root', () => {
    const { getByTestId, getByRole } = render(<Card data-testid="card" aria-label="promo" />);
    const card = getByTestId('card');

    expect(card).toHaveAttribute('aria-label', 'promo');
    // The forwarded attributes land on the root surface element.
    expect(getByRole('article')).toBe(card);
  });

  it('should render without a NextIntlClientProvider (presentational, no i18n)', () => {
    const renderCard = () => render(<Card>Body text</Card>);
    expect(renderCard).not.toThrow();
    cleanup();

    const { getByRole } = renderCard();
    expect(getByRole('article')).toHaveTextContent('Body text');
  });
});
