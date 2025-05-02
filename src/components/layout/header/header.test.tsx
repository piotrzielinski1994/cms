import { resolveServerComponent, withProviders } from '@/utils/tests';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
// import { axe } from 'vitest-axe';
import { Header } from './header';

describe('Header', () => {
  // it('should have no accessibility violations', async () => {
  //   const ServerHeader = await resolveServerComponent(Header, { locale: 'en' });
  //   const { container } = render(withProviders(<ServerHeader />));
  //   const results = await axe(container);
  //   expect(results).toHaveNoViolations();
  // });

  it('should match the snapshot', async () => {
    const ServerHeader = await resolveServerComponent(Header, { locale: 'en' });
    const { container } = render(withProviders(<ServerHeader />));
    expect(container).toMatchSnapshot();
  });
});
