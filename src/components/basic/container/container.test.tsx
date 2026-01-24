import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Container } from './container';

describe('Container', () => {
  const defaultProps: ComponentProps<typeof Container> = {
    children: 'Content',
    'data-testid': 'container',
  };

  it('should have no accessibility violations', async () => {
    const { container } = render(<Container {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<Container {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders as <div/> by default', () => {
    const { container, getByTestId } = render(<Container {...defaultProps} />);
    expect(getByTestId('container').tagName).toBe('DIV');
    expect(container).toHaveTextContent('Content');
  });

  it('renders as <dd/>', () => {
    const { container, getByTestId } = render(<Container {...defaultProps} as="dd" />);
    expect(getByTestId('container').tagName).toBe('DD');
    expect(container).toHaveTextContent('Content');
  });
});
