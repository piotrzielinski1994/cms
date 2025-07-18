import { cn } from '@/utils/tailwind';
import { useTranslations } from 'next-intl';
import { ReactNode, useId, useState } from 'react';

type TabsProps = {
  tabs: Array<{
    heading: ReactNode;
    content: ReactNode;
  }>;
};

const Tabs = ({ tabs }: TabsProps) => {
  const t = useTranslations('frontend.component');
  const [activeIndex, setActiveIndex] = useState(0);
  const id = useId();

  return (
    <div className="grid gap-2">
      <div aria-label={t('tabs')} className="flex gap-2">
        {tabs.map((tab, index) => (
          <label
            key={index}
            id={tabId(id, index)}
            aria-controls={panelId(id, index)}
            className={cn(
              'has-[:checked]:border-b border-foreground',
              '[&:has(input:focus-visible)]:tw-cms-outline',
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
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={panelId(id, index)}
          aria-labelledby={tabId(id, index)}
          hidden={index !== activeIndex}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

const tabId = (id: string, index: number) => `tabs__${id}__${index}`;
const panelId = (id: string, index: number) => `tabs__${id}__${index}`;

export { Tabs };
