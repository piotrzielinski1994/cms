import { en } from '@/payload/locale/en';
import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Table } from './table';

const t = en.storybook.basic.table;

describe('Table', () => {
  const [cols, rows] = [3, 5];
  const defaultProps = {
    header: Array.from({ length: cols }, (_, index) => `${t.header} ${index + 1}`),
    footer: Array.from({ length: cols }, (_, index) => `${t.footer} ${index + 1}`),
    body: Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, index) => `${t.cell} ${rowIndex * cols + index + 1}`),
    ),
  } satisfies ComponentProps<typeof Table>;

  it('should have no accessibility violations', async () => {
    const { container } = render(<Table {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<Table {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
