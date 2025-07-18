import { withProviders } from '@/utils/tests';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Tabs } from './tabs';

describe('Tabs', () => {
  const defaultProps = {
    tabs: [
      {
        heading: 'Tab 1',
        content: 'Content 1',
      },
      {
        heading: 'Tab 2',
        content: 'Content 2',
      },
    ],
  } satisfies ComponentProps<typeof Tabs>;

  it('should have no accessibility violations', async () => {
    const { container } = render(withProviders(<Tabs {...defaultProps} />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(withProviders(<Tabs {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });

  it('should show content of the first tab initially', () => {
    const { queryByText } = render(withProviders(<Tabs {...defaultProps} />));
    expect(queryByText('Content 1')).toBeVisible();
    expect(queryByText('Content 2')).not.toBeVisible();
  });

  it('should switch content when tab is clicked', async () => {
    const { getByText, queryByText } = render(withProviders(<Tabs {...defaultProps} />));
    await userEvent.click(getByText('Tab 2'));
    expect(queryByText('Content 2')).toBeVisible();
    expect(queryByText('Content 1')).not.toBeVisible();
  });
});
