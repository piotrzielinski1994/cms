import { en } from '@/payload/locale/en';
import { withProviders } from '@/utils/tests';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { SkipLink } from './skip-link';

describe('SkipLink', () => {
  const defaultProps = {
    t: { label: en.frontend.component.skipLink },
  } satisfies ComponentProps<typeof SkipLink>;

  it('should have no accessibility violations', async () => {
    const { container } = render(withProviders(<SkipLink {...defaultProps} />));
    const results = await waitFor(() => axe(container));
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(withProviders(<SkipLink {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });

  describe('Interaction', () => {
    beforeEach(() => {
      window.history.pushState({}, '', ' ');
    });

    it('should be hidden if not focused', () => {
      const { getByRole } = render(withProviders(<SkipLink {...defaultProps} />));
      const link = getByRole('link', { hidden: true });
      expect(link).toHaveTextContent(defaultProps.t.label);
    });

    it('should be visible if focused', async () => {
      const { getByRole } = render(withProviders(<SkipLink {...defaultProps} />));

      await userEvent.tab();

      const link = getByRole('link', { hidden: false });
      expect(link).toHaveTextContent(defaultProps.t.label);
    });

    it('should focus #main when activated with Enter key', async () => {
      const { getByRole } = render(withProviders(<SkipLink {...defaultProps} />));
      const link = getByRole('link', { hidden: true });

      expect(window.location.hash).toBe('');

      await userEvent.tab();

      expect(link).toHaveFocus();

      await userEvent.keyboard('{Enter}');

      expect(window.location.hash).toBe('#main');
    });

    it('should not focus #main when activated with spacebar', async () => {
      const { getByRole } = render(withProviders(<SkipLink {...defaultProps} />));
      const link = getByRole('link', { hidden: true });

      expect(window.location.hash).toBe('');

      await userEvent.tab();

      expect(link).toHaveFocus();

      await userEvent.keyboard(' ');

      expect(window.location.hash).toBe('');
    });
  });
});
