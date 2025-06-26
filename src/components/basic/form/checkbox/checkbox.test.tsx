import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  const defaultProps = {
    name: 'name',
    id: 'id',
    label: 'Label',
    onChange: vi.fn(),
  } satisfies ComponentProps<typeof Checkbox>;

  const ControlledComponent = (props: ComponentProps<typeof Checkbox>) => {
    const [isChecked, setIsChecked] = useState<boolean>(props.checked ?? false);
    return (
      <Checkbox
        {...props}
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(e.currentTarget.checked);
          props.onChange?.(e);
        }}
      />
    );
  };

  it('should have no accessibility violations', async () => {
    const { container } = render(<ControlledComponent {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<Checkbox {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  describe('Interactivity', () => {
    it('should call onChange when clicked', async () => {
      const onChange = vi.fn();
      const { getByRole } = render(
        <ControlledComponent {...defaultProps} checked={false} onChange={onChange} />,
      );
      const checkbox = getByRole('checkbox', { name: defaultProps.label }) as HTMLInputElement;

      await userEvent.click(checkbox);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(checkbox.checked).toBe(true);
    });

    it('should be disabled when disabled prop is set', async () => {
      const onChange = vi.fn();
      const { getByRole } = render(<Checkbox {...defaultProps} onChange={onChange} disabled />);

      await userEvent.click(getByRole('checkbox', { name: defaultProps.label }));

      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
