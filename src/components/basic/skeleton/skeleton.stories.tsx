import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Skeleton as SkeletonComponent } from './skeleton';

type Args = ComponentProps<typeof SkeletonComponent>;

const meta = {
  component: SkeletonComponent,
  title: 'Basic/Skeleton',
} satisfies Meta<Args>;

const Render = (_args: Args) => {
  return <SkeletonComponent />;
};

const Skeleton: StoryObj<typeof SkeletonComponent> = { render: Render };

export { Skeleton };
export default meta;
