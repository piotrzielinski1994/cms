import { en } from '@/payload/locale/en';
import { withProviders } from '@/utils/tests';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Alert } from './alert';

const t = en.frontend;

describe('Alert', () => {
  const defaultProps = {
    type: 'info',
    onClose: vi.fn(),
    children: 'Text',
  } satisfies ComponentProps<typeof Alert>;

  it('should have no accessibility violations', async () => {
    const { container } = render(withProviders(<Alert {...defaultProps} />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(withProviders(<Alert {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });

  it('should call onClose on close button click', async () => {
    const { getByRole } = render(withProviders(<Alert {...defaultProps} />));
    await userEvent.click(getByRole('button', { name: t.close }));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
