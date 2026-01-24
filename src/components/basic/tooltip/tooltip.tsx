import { ReactContextError } from '@/utils/error';
import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import {
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type TooltipProps = HtmlProps<'button'> & { content: ReactNode };

type Position = 'center' | 'left' | 'right';

type TooltipContextValue = {
  state: {
    isVisible: boolean;
    position: Position;
  };
  actions: {
    setIsVisible: (v: boolean) => void;
    setPosition: (p: Position) => void;
  };
  meta: {
    id: string;
    containerRef: RefObject<HTMLDivElement | null>;
    tooltipRef: RefObject<HTMLDivElement | null>;
  };
};

const styles = {
  root: 'relative inline-flex',
  trigger: 'focus-visible:tw-cms-outline',
  contentWrapper: 'absolute top-full z-popover pt-2',
  content: 'py-1 px-2 text-xs bg-foreground text-background',
  position: {
    left: 'left-0 -translate-x-0',
    right: 'right-0 translate-x-0',
    center: 'left-1/2 -translate-x-1/2',
  },
} as const;

const TooltipContext = createContext<TooltipContextValue | null>(null);

const Provider = ({ children }: { children: ReactNode }) => {
  const id = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<Position>('center');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!isVisible) return;
    if (!tooltipRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    if (containerRect.width >= tooltipRect.width) {
      setPosition('center');
    } else if (containerRect.right + tooltipRect.width / 2 > window.innerWidth) {
      setPosition('right');
    } else if (containerRect.left - tooltipRect.width / 2 < 0) {
      setPosition('left');
    } else {
      setPosition('center');
    }
  }, [isVisible]);

  const value = useMemo(
    () => ({
      state: { isVisible, position },
      actions: { setIsVisible, setPosition },
      meta: { id, containerRef, tooltipRef },
    }),
    [id, isVisible, position],
  );

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
};

const Root = ({ className, ...rest }: HtmlProps<'div'>) => {
  const {
    actions: { setIsVisible },
    meta: { containerRef },
  } = useTooltip();

  return (
    <div
      {...rest}
      ref={containerRef}
      className={cn(styles.root, className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    />
  );
};

const Trigger = ({ className, ...rest }: HtmlProps<'button'>) => {
  const {
    state: { isVisible },
    actions: { setIsVisible },
    meta: { id },
  } = useTooltip();

  return (
    <button
      {...rest}
      type="button"
      className={cn(styles.trigger, className)}
      aria-describedby={isVisible ? id : undefined}
      onClick={() => setIsVisible(!isVisible)}
      onBlur={() => setIsVisible(false)}
    />
  );
};

const Content = ({ className, ...rest }: HtmlProps<'div'>) => {
  const {
    state: { isVisible, position },
    meta: { id, tooltipRef },
  } = useTooltip();

  if (!isVisible) return null;

  return (
    <div ref={tooltipRef} className={cn(styles.contentWrapper, styles.position[position])}>
      <div id={id} role="tooltip" {...rest} className={cn(styles.content, className)} />
    </div>
  );
};

const Tooltip = Object.assign(
  ({ content, children, ...rest }: TooltipProps) => {
    return (
      <Provider>
        <Root>
          <Trigger {...rest}>{children}</Trigger>
          <Content>{content}</Content>
        </Root>
      </Provider>
    );
  },
  { Provider, Root, Trigger, Content },
);

const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (context) return context;
  throw new ReactContextError('Tooltip');
};

export { Tooltip, useTooltip };
