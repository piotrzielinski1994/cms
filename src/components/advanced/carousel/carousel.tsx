'use client';

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import { ReactContextError } from '@/utils/error';
import type { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';

type CarouselT = {
  label: string;
  previous: string;
  next: string;
  play: string;
  pause: string;
  slide: (n: number, total: number) => string;
};

type CarouselProps = HtmlProps<'section'> & {
  slides: ReactNode[];
  t: CarouselT;
  defaultIndex?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

type ProviderProps = PropsWithChildren<{
  slides: ReactNode[];
  t: CarouselT;
  defaultIndex?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}>;

const styles = {
  root: 'relative grid gap-4 cms-carousel',
  viewport: 'relative overflow-hidden',
  track: 'grid',
  slide: 'col-start-1 row-start-1',
  controls: 'flex items-center justify-between gap-2',
  control: cn(
    'flex h-9 w-9 items-center justify-center',
    'border border-solid border-foreground/15',
    'hover:bg-background1',
    'focus-visible:tw-cms-outline',
  ),
  indicators: 'flex items-center justify-center gap-2',
  indicator: cn(
    'h-3 w-3 rounded-full border border-solid border-foreground/40',
    'focus-visible:tw-cms-outline',
  ),
  indicatorActive: 'bg-foreground',
  playPause: cn(
    'flex h-9 w-9 items-center justify-center',
    'border border-solid border-foreground/15',
    'hover:bg-background1',
    'focus-visible:tw-cms-outline',
  ),
} as const;

const wrap = (index: number, delta: number, length: number) =>
  length <= 0 ? 0 : (index + delta + length) % length;

const clampIndex = (index: number, length: number) =>
  Math.min(Math.max(index, 0), Math.max(0, length - 1));

const CarouselContext = createContext<{
  state: { activeIndex: number; isPlaying: boolean; isInteracting: boolean };
  actions: {
    setActiveIndex: (index: number) => void;
    next: () => void;
    prev: () => void;
    togglePlay: () => void;
    setInteracting: (interacting: boolean) => void;
  };
  meta: {
    id: string;
    slides: ReactNode[];
    t: CarouselT;
    autoPlay: boolean;
    autoPlayInterval: number;
  };
} | null>(null);

const Provider = (props: ProviderProps) => {
  const {
    children,
    slides,
    t,
    defaultIndex = 0,
    autoPlay = false,
    autoPlayInterval = 5000,
  } = props;
  const id = useId();
  const length = slides.length;

  const [activeIndex, setActiveIndexState] = useState(() => clampIndex(defaultIndex, length));
  const [isInteracting, setInteracting] = useState(false);
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true,
  );
  const [isPlaying, setIsPlaying] = useState(() => autoPlay && !prefersReducedMotion && length > 1);

  const setActiveIndex = useCallback(
    (index: number) => setActiveIndexState(clampIndex(index, length)),
    [length],
  );
  const next = useCallback(() => setActiveIndexState((i) => wrap(i, 1, length)), [length]);
  const prev = useCallback(() => setActiveIndexState((i) => wrap(i, -1, length)), [length]);
  const togglePlay = useCallback(() => setIsPlaying((playing) => !playing), []);

  const effectivePlaying = isPlaying && !isInteracting;

  useEffect(() => {
    if (!autoPlay || !effectivePlaying || length <= 1) return;
    const timer = setInterval(
      () => setActiveIndexState((i) => wrap(i, 1, length)),
      autoPlayInterval,
    );
    return () => clearInterval(timer);
  }, [autoPlay, effectivePlaying, autoPlayInterval, length]);

  const value = useMemo(
    () => ({
      state: { activeIndex, isPlaying, isInteracting },
      actions: { setActiveIndex, next, prev, togglePlay, setInteracting },
      meta: { id, slides, t, autoPlay, autoPlayInterval },
    }),
    [
      activeIndex,
      isPlaying,
      isInteracting,
      setActiveIndex,
      next,
      prev,
      togglePlay,
      id,
      slides,
      t,
      autoPlay,
      autoPlayInterval,
    ],
  );

  return <CarouselContext.Provider value={value}>{children}</CarouselContext.Provider>;
};

const Root = ({ className, children, ...rest }: HtmlProps<'section'>) => {
  const {
    actions: { next, prev, setInteracting },
    meta: { t },
  } = useCarousel();

  return (
    <section
      {...rest}
      aria-roledescription="carousel"
      aria-label={t.label}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={() => setInteracting(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') next();
        if (event.key === 'ArrowLeft') prev();
      }}
      className={cn(styles.root, className)}
    >
      {children}
    </section>
  );
};

const Viewport = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div {...rest} className={cn(styles.viewport, className)} />;
};

const Track = ({ className, ...rest }: HtmlProps<'div'>) => {
  const {
    state: { activeIndex, isPlaying, isInteracting },
  } = useCarousel();
  const effectivePlaying = isPlaying && !isInteracting;

  return (
    <div
      {...rest}
      aria-live={effectivePlaying ? 'off' : 'polite'}
      data-active-index={activeIndex}
      className={cn(styles.track, className)}
    />
  );
};

const Slide = ({ index, className, ...rest }: HtmlProps<'div'> & { index: number }) => {
  const {
    state: { activeIndex },
    meta: { slides, t },
  } = useCarousel();
  const isActive = index === activeIndex;

  return (
    <div
      {...rest}
      role="group"
      aria-roledescription="slide"
      aria-label={t.slide(index + 1, slides.length)}
      hidden={!isActive}
      className={cn(styles.slide, className)}
    />
  );
};

const Previous = ({ className, ...rest }: HtmlProps<'button'>) => {
  const {
    actions: { prev },
    meta: { t },
  } = useCarousel();

  return (
    <button
      {...rest}
      type="button"
      aria-label={t.previous}
      onClick={prev}
      className={cn(styles.control, className)}
    >
      <ChevronLeft aria-hidden="true" className="h-4 w-4" />
    </button>
  );
};

const Next = ({ className, ...rest }: HtmlProps<'button'>) => {
  const {
    actions: { next },
    meta: { t },
  } = useCarousel();

  return (
    <button
      {...rest}
      type="button"
      aria-label={t.next}
      onClick={next}
      className={cn(styles.control, className)}
    >
      <ChevronRight aria-hidden="true" className="h-4 w-4" />
    </button>
  );
};

const Indicators = ({ className, ...rest }: HtmlProps<'div'>) => {
  const {
    state: { activeIndex },
    actions: { setActiveIndex },
    meta: { id, slides, t },
  } = useCarousel();

  return (
    <div {...rest} className={cn(styles.indicators, className)}>
      {slides.map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={`${id}-indicator-${index}`}
            type="button"
            aria-label={t.slide(index + 1, slides.length)}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => setActiveIndex(index)}
            className={cn(styles.indicator, isActive && styles.indicatorActive)}
          />
        );
      })}
    </div>
  );
};

const PlayPause = ({ className, ...rest }: HtmlProps<'button'>) => {
  const {
    state: { isPlaying },
    actions: { togglePlay },
    meta: { t },
  } = useCarousel();

  return (
    <button
      {...rest}
      type="button"
      aria-label={isPlaying ? t.pause : t.play}
      onClick={togglePlay}
      className={cn(styles.playPause, className)}
    >
      {isPlaying ? (
        <Pause aria-hidden="true" className="h-4 w-4" />
      ) : (
        <Play aria-hidden="true" className="h-4 w-4" />
      )}
    </button>
  );
};

const Carousel = Object.assign(
  ({
    slides,
    t,
    defaultIndex,
    autoPlay = false,
    autoPlayInterval,
    className,
    ...rest
  }: CarouselProps) => {
    return (
      <Provider
        slides={slides}
        t={t}
        defaultIndex={defaultIndex}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
      >
        <Root {...rest} className={className}>
          <Viewport>
            <Track>
              {slides.map((slide, index) => (
                <Slide key={index} index={index}>
                  {slide}
                </Slide>
              ))}
            </Track>
          </Viewport>
          {slides.length > 0 && (
            <div className={styles.controls}>
              <Previous />
              <Indicators />
              <Next />
              {autoPlay && <PlayPause />}
            </div>
          )}
        </Root>
      </Provider>
    );
  },
  { Provider, Root, Viewport, Track, Slide, Previous, Next, Indicators, PlayPause },
);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (context) return context;
  throw new ReactContextError('Carousel');
};

export type { CarouselProps, CarouselT };
export { Carousel, styles, useCarousel };
