import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Form from '../root/form';
import { SelectA } from './select';

describe('Select', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Form.Group>
        <SelectA />
      </Form.Group>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<SelectA />);
    expect(container).toMatchSnapshot();
  });
});
