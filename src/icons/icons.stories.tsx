import ContrastSvg from '@/icons/contrast.svg';
import FontScalerSvg from '@/icons/font-scaler.svg';
import LogoSvg from '@/icons/logo.svg';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/Basic/Icons',
};

const Render = () => {
  return (
    <div className="grid gap-4">
      <LogoSvg />
      <div className="flex flex-wrap gap-4">
        <ContrastSvg />
        <FontScalerSvg />
      </div>
    </div>
  );
};

const Icons: StoryObj = { render: Render };

export { Icons };
export default meta;
