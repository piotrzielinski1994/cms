import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  const defaultProps = {
    content: 'Tooltip text',
    children: <span>Trigger</span>,
  } satisfies ComponentProps<typeof Tooltip>;

  it('should have no accessibility violations', async () => {
    const { container, getByRole } = render(<Tooltip {...defaultProps} />);
    await userEvent.hover(getByRole('button'));

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container, getByRole } = render(<Tooltip {...defaultProps} />);
    await userEvent.hover(getByRole('button'));
    expect(container).toMatchSnapshot();
  });

  it('should show tooltip on hover and hide on mouse leave', async () => {
    const { getByRole, queryByRole } = render(<Tooltip {...defaultProps} />);
    const button = getByRole('button');

    await userEvent.hover(button);
    expect(getByRole('tooltip')).toBeVisible();

    await userEvent.unhover(button);
    expect(queryByRole('tooltip')).toBeNull();
  });

  it('should toggle tooltip on click', async () => {
    const { getByRole, queryByRole } = render(<Tooltip {...defaultProps} />);
    const button = getByRole('button');

    await userEvent.hover(button);
    expect(getByRole('tooltip')).toBeVisible();

    await userEvent.click(button);
    expect(queryByRole('tooltip')).toBeNull();

    await waitFor(() => button.click()); // userEvent approach seems to conflict with hover effect
    expect(getByRole('tooltip')).toBeVisible();
  });
});
