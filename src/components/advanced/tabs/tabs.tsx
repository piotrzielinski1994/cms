import { useHtmlId } from '@/utils/html/html.hooks';
import { cn } from '@/utils/tailwind';
import { ReactNode, useState } from 'react';

type TabsProps = {
  tabs: Array<{
    heading: ReactNode;
    content: ReactNode;
  }>;
};

const styles = {
  root: 'grid',
  header: 'flex gap-2',
  tab: cn(
    'has-[:checked]:border-b border-foreground',
    'tw-has-focus:tw-cms-outline',
    'px-4 py-2 md:px-6',
    'cursor-pointer',
  ),
  content: 'p-4 md:px-6',
  radio: 'peer sr-only',
};

const Tabs = ({ tabs }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { id, getId } = useHtmlId('tabs');

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {tabs.map((tab, index) => {
          return (
            <label
              key={index}
              id={getId('tab', index)}
              aria-controls={getId('panel', index)}
              className={styles.tab}
            >
              <input
                type="radio"
                name={`tabs-${id}`}
                className={styles.radio}
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
          className={styles.content}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export { Tabs };
