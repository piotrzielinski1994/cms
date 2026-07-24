import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { Pagination as PaginationComponent } from './pagination';

type Args = ComponentProps<typeof PaginationComponent>;

const meta = {
  component: PaginationComponent,
  title: 'Basic/Pagination',
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    siblingCount: { control: 'number' },
  },
  args: {
    currentPage: 3,
    totalPages: 5,
    siblingCount: 1,
  },
} satisfies Meta<Args>;

const getHref = (page: number) => `?page=${page}`;

const Render = ({ currentPage = 3, totalPages = 5, siblingCount = 1 }: Partial<Args>) => {
  const t = useTranslations('frontend.component.pagination');
  const labels = useTranslations('storybook.basic.pagination');
  const paginationT = {
    label: t('label'),
    previous: t('previous'),
    next: t('next'),
    morePages: t('morePages'),
  };
  return (
    <div className="grid gap-8">
      <section className="grid gap-2">
        <h3>{labels('fewPages')}</h3>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          siblingCount={siblingCount}
          getHref={getHref}
          t={paginationT}
        />
      </section>
      <section className="grid gap-2">
        <h3>{labels('manyPages')}</h3>
        <PaginationComponent currentPage={5} totalPages={10} getHref={getHref} t={paginationT} />
      </section>
    </div>
  );
};

const Pagination: StoryObj<typeof PaginationComponent> = { render: Render };

export { Pagination };
export default meta;
