import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Header } from './header';

it('should have no accessibility violations', async () => {
  const { container } = render(<Header locale="en" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
