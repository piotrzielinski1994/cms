import { Link } from '@/components/basic/link/link';
import { Tooltip } from '@/components/basic/tooltip/tooltip';
import * as svgs from '@/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { toPairs } from 'ramda';

const meta: Meta = {
  title: 'Basic/Icons',
};
const { LogoSvg, ...restSvgs } = svgs;

const icons = toPairs(restSvgs).map(([componentName, Svg], i) => (
  <Tooltip key={i} content={componentName}>
    <Svg />
  </Tooltip>
));

const Render = () => {
  const t = useTranslations('storybook.icons');
  return (
    <div className="grid justify-items-start gap-4 text-2xl">
      <Tooltip content="LogoSvg">
        <LogoSvg />
      </Tooltip>
      <div className="flex flex-wrap gap-4">{icons}</div>
      <p className="text-sm italic">
        {t.rich('annotation', {
          a: (chunks) => (
            <Link href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </div>
  );
};

const Icons: StoryObj = { render: Render };

export { Icons };
export default meta;
