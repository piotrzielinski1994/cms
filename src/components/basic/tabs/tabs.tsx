import { useHtmlId } from '@/hooks/html.hooks';
import { cn } from '@/utils/tailwind';
import { useTranslations } from 'next-intl';
import { ReactNode, useState } from 'react';

type TabsProps = {
  tabs: Array<{
    heading: ReactNode;
    content: ReactNode;
  }>;
};

const Tabs = ({ tabs }: TabsProps) => {
  const t = useTranslations('frontend.component');
  const [activeIndex, setActiveIndex] = useState(0);
  const { id, getId } = useHtmlId('tabs');

  return (
    <div className="grid gap-2">
      <div aria-label={t('tabs')} className="flex gap-2">
        {tabs.map((tab, index) => {
          return (
            <label
              key={index}
              id={getId('tab', index)}
              aria-controls={getId('panel', index)}
              className={cn(
                'has-[:checked]:border-b border-foreground',
                'tw-has-focus:tw-cms-outline',
                'px-2',
                'cursor-pointer',
              )}
            >
              <input
                type="radio"
                name={`tabs-${id}`}
                className="peer sr-only"
                checked={index === activeIndex}
                onChange={() => setActiveIndex(index)}
              />
              {tab.heading}
            </label>
          );
        })}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={getId('panel', index)}
          aria-labelledby={getId('tab', index)}
          hidden={index !== activeIndex}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export { Tabs };
