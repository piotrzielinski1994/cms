import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Alert } from './alert';

describe('Alert', () => {
  const defaultItems = [
    { heading: 'Heading 1', content: 'Content 1' },
    { heading: 'Heading 2', content: 'Content 2' },
  ] satisfies ComponentProps<typeof Alert>['items'];

  it('should have no accessibility violations', async () => {
    const { container } = render(<Alert items={defaultItems} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<Alert items={defaultItems} />);
    expect(container).toMatchSnapshot();
  });
});
