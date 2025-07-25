import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { type ComponentProps } from 'react';
import { Table as TableComponent } from './table';

type Args = ComponentProps<typeof TableComponent>;

const meta = {
  component: TableComponent,
  title: 'Basic/Table',
  argTypes: {},
  args: {},
} satisfies Meta<Args>;

const Render = ({ ...args }: Args) => {
  const t = useTranslations('storybook.basic.table');
  const [cols, rows] = [3, 5];

  const header = Array.from({ length: cols }, (_, index) => `${t('header')} ${index + 1}`);
  const footer = Array.from({ length: cols }, (_, index) => `${t('footer')} ${index + 1}`);
  const cells = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, index) => `${t('cell')} ${rowIndex * cols + index + 1}`),
  );

  return (
    <div className="flex gap-1">
      <TableComponent {...args} header={header} footer={footer} body={cells} />
    </div>
  );
};

const Table: StoryObj<typeof TableComponent> = { render: Render };

export { Table };
export default meta;
