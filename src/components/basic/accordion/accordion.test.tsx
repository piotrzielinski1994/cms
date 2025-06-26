import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Accordion } from './accordion';

describe('Accordion', () => {
  const user = userEvent.setup();
  const defaultItems = [
    { heading: 'Heading 1', content: 'Content 1' },
    { heading: 'Heading 2', content: 'Content 2' },
  ] satisfies ComponentProps<typeof Accordion>['items'];

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
      const button1 = getByRole('button', { name: 'Heading 1' });

      await user.click(button1);
      expect(button1).toHaveAttribute('aria-expanded', 'true');
      expect(getByText('Content 1')).toHaveAttribute('aria-hidden', 'false');

      await user.click(button1);
      expect(button1).toHaveAttribute('aria-expanded', 'false');
      expect(getByText('Content 1')).toHaveAttribute('aria-hidden', 'true');
    });

    it('should open the item specified by activeItemIndex initially', () => {
      const { getByRole, getByText } = render(
        <Accordion items={defaultItems} activeItemIndex={1} />,
      );
      const button2 = getByRole('button', { name: 'Heading 2' });

      expect(button2).toHaveAttribute('aria-expanded', 'true');
      expect(getByText('Content 2')).toHaveAttribute('aria-hidden', 'false');
    });

    it('should close previously opened item when another is clicked', async () => {
      const { getByRole, getByText } = render(
        <Accordion items={defaultItems} activeItemIndex={0} />,
      );
      const button1 = getByRole('button', { name: 'Heading 1' });
      const button2 = getByRole('button', { name: 'Heading 2' });

      await user.click(getByText('Heading 2'));

      expect(button1).toHaveAttribute('aria-expanded', 'false');
      expect(getByText('Content 1')).toHaveAttribute('aria-hidden', 'true');
      expect(button2).toHaveAttribute('aria-expanded', 'true');
      expect(getByText('Content 2')).toHaveAttribute('aria-hidden', 'false');
    });
  });
});
