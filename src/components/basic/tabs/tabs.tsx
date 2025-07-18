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
    <div>
      <div role="tablist" aria-label={t('tabs')} className="flex gap-2">
        {tabs.map((tab, index) => (
          <label
            key={index}
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
              checked={activeIndex === index}
              onChange={() => setActiveIndex(index)}
            />
            {tab.heading}
          </label>
        ))}
      </div>
      <div className="">{tabs[activeIndex].content}</div>
    </div>
  );
};

export { Tabs };
