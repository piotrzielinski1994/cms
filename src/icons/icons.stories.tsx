import * as svgs from '@/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { toPairs } from 'ramda';

const meta: Meta = {
  title: 'Components/Basic/Icons',
};

const { LogoSvg, ...restSvgs } = svgs;
const icons = toPairs(restSvgs).map(([_, Svg], i) => <Svg key={i} />);

const Render = () => {
  return (
    <div className="grid gap-4 text-2xl">
      <LogoSvg />
      <div className="flex flex-wrap gap-4">{icons}</div>
    </div>
  );
};

const Icons: StoryObj = { render: Render };

export { Icons };
export default meta;
