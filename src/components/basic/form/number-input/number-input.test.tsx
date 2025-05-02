import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Form from '../root/form';
import { NumberInput } from './number-input';

describe('Accordion', () => {
  const defaultProps = {
    name: 'name',
    id: 'id',
    t: { increment: 'Increment', decrement: 'Decrement' },
  } satisfies ComponentProps<typeof NumberInput>;

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Form.Group>
        <Form.Label htmlFor={defaultProps.id}>Label</Form.Label>
        <NumberInput {...defaultProps} />
      </Form.Group>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<NumberInput {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  // describe('Buttons', () => {
  //   it('should increase the value', async () => {
  //     const { getByLabelText, getByRole } = render(<NumberInput {...defaultProps} />);
  //     expect((getByRole('textbox') as HTMLInputElement).value).toBe('');

  //     console.log(
  //       '@@@ getByLabelText(defaultProps.t.increment) | ',
  //       getByLabelText(defaultProps.t.increment),
  //     );

  //     fireEvent.click(getByLabelText(defaultProps.t.increment));
  //     // getByLabelText(defaultProps.t.increment).click();

  //     // expect((getByRole('textbox') as HTMLInputElement).value).toBe('1');
  //     await waitFor(() => {
  //       expect((getByRole('textbox') as HTMLInputElement).value).toBe('1');
  //     });
  //   });
  // });
});
