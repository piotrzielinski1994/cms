import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Accordion } from './accordion';

describe('Accordion', () => {
  const defaultItems = [
    { heading: 'Heading 1', content: 'Content 1' },
    { heading: 'Heading 2', content: 'Content 2' },
  ] satisfies ComponentProps<typeof Accordion>['items'];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Accordion items={defaultItems} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', () => {
    const { container } = render(<Accordion items={defaultItems} />);
    expect(container).toMatchSnapshot();
  });

  describe('Interaction', () => {
    it('should toggle item on click', async () => {
      const { getByRole, getByText } = render(<Accordion items={defaultItems} />);
      const radio1 = getByRole('radio', { name: 'Heading 1' });

      await userEvent.click(radio1);
      expect(radio1).toBeChecked();
      expect(getByText('Content 1')).toHaveAttribute('aria-hidden', 'false');

      await userEvent.click(radio1);
      expect(radio1).not.toBeChecked();
      expect(getByText('Content 1')).toHaveAttribute('aria-hidden', 'true');
    });

    it('should open the item specified by activeItemIndex initially', () => {
      const { getByRole, getByText } = render(
        <Accordion items={defaultItems} activeItemIndex={1} />,
      );
      const radio2 = getByRole('radio', { name: 'Heading 2' });

      expect(radio2).toBeChecked();
      expect(getByText('Content 2')).toHaveAttribute('aria-hidden', 'false');
    });

    it('should close previously opened item when another is clicked', async () => {
      const { getByRole, getByText } = render(
        <Accordion items={defaultItems} activeItemIndex={0} />,
      );
      const radio1 = getByRole('radio', { name: 'Heading 1' });
      const radio2 = getByRole('radio', { name: 'Heading 2' });

      await userEvent.click(getByText('Heading 2'));

      expect(radio1).not.toBeChecked();
      expect(getByText('Content 1')).toHaveAttribute('aria-hidden', 'true');
      expect(radio2).toBeChecked();
      expect(getByText('Content 2')).toHaveAttribute('aria-hidden', 'false');
    });
  });
});
