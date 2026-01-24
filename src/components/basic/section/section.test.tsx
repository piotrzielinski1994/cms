import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Section } from './section';

describe('Section', () => {
  const defaultProps = {
    children: 'Content',
    'data-testid': 'section',
  } satisfies ComponentProps<typeof Section>;

  it('should have no accessibility violations', async () => {
    const { container } = render(<Section {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<Section {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders as <section/> by default', () => {
    const { container, getByTestId } = render(<Section {...defaultProps} />);
    expect(getByTestId(defaultProps['data-testid']).tagName).toBe('SECTION');
    expect(container).toHaveTextContent('Content');
  });

  it('renders as <dd/>', () => {
    const { container, getByTestId } = render(<Section {...defaultProps} as="dd" />);
    expect(getByTestId(defaultProps['data-testid']).tagName).toBe('DD');
    expect(container).toHaveTextContent('Content');
  });
});
