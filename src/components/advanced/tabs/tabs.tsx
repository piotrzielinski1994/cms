import { ReactContextError } from '@/utils/error';
import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { ReactNode, createContext, useContext, useId, useMemo, useState } from 'react';

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
} as const;

const TabsContext = createContext<{
  state: {
    activeIndex: number;
  };
  actions: {
    setActiveIndex: (i: number) => void;
  };
  meta: {
    id: string;
  };
} | null>(null);

const Provider = ({ children }: { children: ReactNode }) => {
  const id = useId();
  const [activeIndex, setActiveIndex] = useState(0);

  const value = useMemo(
    () => ({
      state: { activeIndex },
      actions: { setActiveIndex },
      meta: { id },
    }),
    [activeIndex, id],
  );

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

const Root = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div {...rest} className={cn(styles.root, className)} />;
};

const List = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div {...rest} className={cn(styles.header, className)} />;
};

const Trigger = ({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) => {
  const {
    state: { activeIndex },
    actions: { setActiveIndex },
    meta: { id },
  } = useTabs();

  return (
    <label
      id={`${id}-tab-${index}`}
      aria-controls={`${id}-panel-${index}`}
      className={cn(styles.tab, className)}
    >
      <input
        type="radio"
        name={`tabs-${id}`}
        className={styles.radio}
        checked={index === activeIndex}
        onChange={() => setActiveIndex(index)}
      />
      {children}
    </label>
  );
};

const Content = (props: { index: number; className?: string; children: ReactNode }) => {
  const { index, className, children } = props;
  const {
    state: { activeIndex },
    meta: { id },
  } = useTabs();

  return (
    <div
      role="tabpanel"
      id={`${id}-panel-${index}`}
      aria-labelledby={`${id}-tab-${index}`}
      hidden={index !== activeIndex}
      className={cn(styles.content, className)}
    >
      {children}
    </div>
  );
};

const Tabs = Object.assign(
  ({ tabs }: TabsProps) => {
    return (
      <Provider>
        <Root>
          <List>
            {tabs.map((tab, index) => (
              <Trigger key={index} index={index}>
                {tab.heading}
              </Trigger>
            ))}
          </List>
          {tabs.map((tab, index) => (
            <Content key={index} index={index}>
              {tab.content}
            </Content>
          ))}
        </Root>
      </Provider>
    );
  },
  { Provider, Root, List, Trigger, Content },
);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (context) return context;
  throw new ReactContextError('Tabs');
};

export { Tabs, styles, useTabs };
