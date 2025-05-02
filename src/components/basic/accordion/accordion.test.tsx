import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Accordion } from './accordion';

describe('Accordion', () => {
  const defaultItems = [
    { heading: 'Heading 1', content: 'Content 1' },
    { heading: 'Heading 2', content: 'Content 2' },
  ] satisfies ComponentProps<typeof Accordion>['items'];

  it('should have no accessibility violations', async () => {
    const { container } = render(<Accordion items={defaultItems} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<Accordion items={defaultItems} />);
    expect(container).toMatchSnapshot();
  });
});
