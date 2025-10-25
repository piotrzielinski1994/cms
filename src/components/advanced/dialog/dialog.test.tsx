import { translations } from '@/config/store/locales.config';
import { withProviders } from '@/utils/tests';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Dialog } from './dialog';

describe('Dialog', () => {
  const t = translations.en;
  const footerProps = {
    submitBtn: { label: t.storybook.advanced.dialog.submit, onClick: vi.fn() },
    cancelBtn: { label: t.storybook.advanced.dialog.cancel, onClick: vi.fn() },
  } satisfies ComponentProps<typeof Dialog.Footer>;
  const defaultProps = {
    header: 'Header',
    footer: <Dialog.Footer {...footerProps} />,
    onClose: vi.fn(),
    open: true,
    t: { close: t.frontend.close },
  } satisfies ComponentProps<typeof Dialog>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(withProviders(<Dialog {...defaultProps} />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(withProviders(<Dialog {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });

  describe('Interactions', () => {
    it('should trigger closing when close button is clicked', async () => {
      const { getByRole } = render(withProviders(<Dialog {...defaultProps} />));

      await userEvent.click(getByRole('button', { name: defaultProps.t.close }));

      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('should trigger submission when submit button is clicked', async () => {
      const { getByRole } = render(withProviders(<Dialog {...defaultProps} />));

      await userEvent.click(getByRole('button', { name: footerProps.submitBtn.label }));

      expect(footerProps.submitBtn.onClick).toHaveBeenCalled();
    });

    it('should trigger cancel event when cancel button is clicked', async () => {
      const { getByRole } = render(withProviders(<Dialog {...defaultProps} />));

      await userEvent.click(getByRole('button', { name: footerProps.cancelBtn.label }));

      expect(footerProps.cancelBtn.onClick).toHaveBeenCalled();
    });

    describe('Keyboard', () => {
      it('should trigger closing modal when Escape key is pressed', () => {
        const { getByRole } = render(withProviders(<Dialog {...defaultProps} type="modal" />));
        const modal = getByRole('dialog');

        fireEvent.keyDown(modal, { key: 'Escape' }); // userEvent was not triggering event

        expect(defaultProps.onClose).toHaveBeenCalled();
      });

      it('should not trigger closing dialog when Escape key is pressed', async () => {
        const { getByRole } = render(withProviders(<Dialog {...defaultProps} type="dialog" />));
        const dialog = getByRole('dialog');

        fireEvent.keyDown(dialog, { key: 'Escape' });

        expect(defaultProps.onClose).not.toHaveBeenCalled();
      });
    });
  });
});
