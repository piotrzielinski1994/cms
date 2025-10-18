import { useHtmlId } from '@/utils/html/html.hooks';
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
    <div className="grid">
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
                'px-4 py-2 md:px-6',
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
          className="p-4 md:px-6"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export { Tabs };
