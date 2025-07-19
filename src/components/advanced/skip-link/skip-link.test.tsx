import { en } from '@/payload/locale/en';
import { withProviders } from '@/utils/tests';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { SkipLink } from './skip-link';

const t = en.frontend.component;

describe('SkipLink', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(withProviders(<SkipLink />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(withProviders(<SkipLink />));
    expect(container).toMatchSnapshot();
  });

  describe('Interaction', () => {
    beforeEach(() => {
      window.history.pushState({}, '', ' ');
    });

    it('should be hidden if not focused', () => {
      const { getByRole } = render(withProviders(<SkipLink />));
      const link = getByRole('link', { hidden: true });
      expect(link).toHaveTextContent(t.skipLink);
    });

    it('should be visible if focused', async () => {
      const { getByRole } = render(withProviders(<SkipLink />));

      await userEvent.tab();

      const link = getByRole('link', { hidden: false });
      expect(link).toHaveTextContent(t.skipLink);
    });

    it('should focus #main when activated with Enter key', async () => {
      const { getByRole } = render(withProviders(<SkipLink />));
      const link = getByRole('link', { hidden: true });

      expect(window.location.hash).toBe('');

      await userEvent.tab();

      expect(link).toHaveFocus();

      await userEvent.keyboard('{Enter}');

      expect(window.location.hash).toBe('#main');
    });

    it('should not focus #main when activated with spacebar', async () => {
      const { getByRole } = render(withProviders(<SkipLink />));
      const link = getByRole('link', { hidden: true });

      expect(window.location.hash).toBe('');

      await userEvent.tab();

      expect(link).toHaveFocus();

      await userEvent.keyboard(' ');

      expect(window.location.hash).toBe('');
    });
  });
});
