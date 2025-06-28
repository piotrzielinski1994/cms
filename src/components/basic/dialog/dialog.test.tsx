import { translations } from '@/config/locales.config';
import { withProviders } from '@/utils/tests';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import Dialog from './dialog';

describe('Dialog', () => {
  const t = translations.en;
  const footerProps = {
    submitBtn: { label: t.storybook.basic.dialog.submit, onClick: vi.fn() },
    cancelBtn: { label: t.storybook.basic.dialog.cancel, onClick: vi.fn() },
  } satisfies ComponentProps<typeof Dialog.Footer>;
  const defaultProps = {
    header: 'Header',
    footer: <Dialog.Footer {...footerProps} />,
    onClose: vi.fn(),
    open: true,
  } satisfies ComponentProps<typeof Dialog.Root>;

  it('should have no accessibility violations', async () => {
    const { container } = render(withProviders()(<Dialog.Root {...defaultProps} />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(withProviders()(<Dialog.Root {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });

  describe('Interactions', () => {
    it('should trigger closing when close button is clicked', async () => {
      const { getByRole } = render(withProviders()(<Dialog.Root {...defaultProps} />));

      await userEvent.click(getByRole('button', { name: t.frontend.close }));

      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('should trigger submission when submit button is clicked', async () => {
      const { getByRole } = render(withProviders()(<Dialog.Root {...defaultProps} />));

      await userEvent.click(getByRole('button', { name: footerProps.submitBtn.label }));

      expect(footerProps.submitBtn.onClick).toHaveBeenCalled();
    });

    it('should trigger cancel event when cancel button is clicked', async () => {
      const { getByRole } = render(withProviders()(<Dialog.Root {...defaultProps} />));

      await userEvent.click(getByRole('button', { name: footerProps.cancelBtn.label }));

      expect(footerProps.cancelBtn.onClick).toHaveBeenCalled();
    });

    it('should trigger closing when Escape key is pressed', async () => {
      const { getByRole } = render(withProviders()(<Dialog.Root {...defaultProps} />));
      const dialog = getByRole('dialog');

      await userEvent.type(dialog, '{Escape}');

      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });
});
