import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Form from './form';

describe('Form', () => {
  const component = (
    <Form.Root>
      <Form.Group>
        <Form.Label htmlFor="id">Label</Form.Label>
        <input id="id" />
        <Form.Error>Error</Form.Error>
      </Form.Group>
    </Form.Root>
  );

  it('should have no accessibility violations', async () => {
    const { container } = render(component);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
});
