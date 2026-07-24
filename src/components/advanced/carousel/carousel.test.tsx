import { existsSync, readFileSync } from 'node:fs';
import { act, fireEvent, render, waitFor, within } from '@testing-library/react';
import type { ComponentProps, ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { withProviders } from '@/utils/tests';
import { Carousel, styles, useCarousel } from './carousel';

// Sentinel labels prove the component reads every label from the `t` prop, never from i18n.
const t = {
  label: 'SENTINEL_LABEL',
  previous: 'SENTINEL_PREV',
  next: 'SENTINEL_NEXT',
  play: 'SENTINEL_PLAY',
  pause: 'SENTINEL_PAUSE',
  slide: (n: number, total: number) => `SENTINEL_SLIDE ${n} of ${total}`,
} satisfies ComponentProps<typeof Carousel>['t'];

const makeSlides = (count: number): ReactNode[] =>
  Array.from({ length: count }, (_, index) => `Body ${index + 1}`);

const defaultProps = {
  slides: makeSlides(3),
  t,
} satisfies ComponentProps<typeof Carousel>;

const renderCarousel = (props: Partial<ComponentProps<typeof Carousel>> = {}) =>
  render(withProviders(<Carousel {...defaultProps} {...props} />));

// The one region landmark is the carousel root; scope every structural query to it.
const getRegion = (root: HTMLElement) => {
  const region = root.querySelector<HTMLElement>('[aria-roledescription="carousel"]');
  if (!region) throw new Error('no carousel region rendered');
  return region;
};

const slideGroups = (region: HTMLElement) => [
  ...region.querySelectorAll<HTMLElement>('[aria-roledescription="slide"]'),
];

// The active slide is the single slide group that is not hidden; returns its 1-based number.
const activeSlideNumber = (region: HTMLElement) => {
  const groups = slideGroups(region);
  const index = groups.findIndex((group) => !group.hasAttribute('hidden'));
  return index === -1 ? 0 : index + 1;
};

const button = (region: HTMLElement, name: string) => within(region).getByRole('button', { name });

const queryButton = (region: HTMLElement, name: string) =>
  within(region).queryByRole('button', { name });

// The indicator for slide n is the <button> whose accessible name is the slide label.
const indicator = (region: HTMLElement, n: number, total: number) =>
  button(region, t.slide(n, total));

describe('Carousel', () => {
  afterEach(() => vi.useRealTimers());

  // TC-001 (AC-001, AC-003): named import resolves + exactly one region landmark named by t.label.
  it('should expose named exports and render one carousel region named by t.label', () => {
    expect(typeof Carousel).toBe('function');
    expect(typeof useCarousel).toBe('function');
    expect(typeof styles).toBe('object');

    const { container } = renderCarousel();
    expect(container.querySelectorAll('[aria-roledescription="carousel"]')).toHaveLength(1);

    const region = getRegion(container);
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');
    expect(within(container).getByRole('region', { name: t.label })).toBe(region);
  });

  // TC-002 (AC-002): the compound sub-parts are independently usable when hand-composed.
  it('should render each named sub-part element when hand-composed', () => {
    for (const part of [
      'Provider',
      'Root',
      'Viewport',
      'Track',
      'Slide',
      'Previous',
      'Next',
      'Indicators',
      'PlayPause',
    ] as const) {
      expect(typeof Carousel[part]).toBe('function');
    }

    const { container } = render(
      withProviders(
        <Carousel.Provider slides={makeSlides(2)} t={t}>
          <Carousel.Root>
            <Carousel.Viewport>
              <Carousel.Track>
                <Carousel.Slide index={0}>Alpha</Carousel.Slide>
                <Carousel.Slide index={1}>Beta</Carousel.Slide>
              </Carousel.Track>
            </Carousel.Viewport>
            <Carousel.Previous className="custom-prev" />
            <Carousel.Next className="custom-next" />
            <Carousel.Indicators />
          </Carousel.Root>
        </Carousel.Provider>,
      ),
    );

    const region = getRegion(container);
    expect(slideGroups(region)).toHaveLength(2);
    expect(button(region, t.previous)).toBeInTheDocument();
    expect(button(region, t.next)).toBeInTheDocument();
    expect(indicator(region, 1, 2)).toBeInTheDocument();
    expect(indicator(region, 2, 2)).toBeInTheDocument();
  });

  // TC-003 (AC-003): one slide group per item, each named t.slide(n,total), exactly one visible.
  it('should render one named slide group per item with only the default one visible', () => {
    const { container } = renderCarousel({ slides: makeSlides(4), defaultIndex: 0 });
    const region = getRegion(container);

    const groups = slideGroups(region);
    expect(groups).toHaveLength(4);
    groups.forEach((group, index) => {
      expect(group).toHaveAttribute('aria-label', t.slide(index + 1, 4));
    });

    const visible = groups.filter((group) => !group.hasAttribute('hidden'));
    expect(visible).toHaveLength(1);
    expect(activeSlideNumber(region)).toBe(1);
  });

  // TC-003 (AC-003): defaultIndex selects the initially visible slide (clamped into range).
  it('should honor defaultIndex for the initially visible slide', () => {
    const { container } = renderCarousel({ slides: makeSlides(4), defaultIndex: 2 });
    expect(activeSlideNumber(getRegion(container))).toBe(3);
  });

  // TC-004 (AC-004): Next advances with wrap last->first; Previous wraps first->last.
  it('should advance and wrap around with Next and Previous', () => {
    const { container } = renderCarousel({ slides: makeSlides(3), defaultIndex: 0 });
    const region = getRegion(container);

    expect(activeSlideNumber(region)).toBe(1);
    fireEvent.click(button(region, t.next));
    expect(activeSlideNumber(region)).toBe(2);
    fireEvent.click(button(region, t.next));
    expect(activeSlideNumber(region)).toBe(3);
    fireEvent.click(button(region, t.next));
    expect(activeSlideNumber(region)).toBe(1);

    fireEvent.click(button(region, t.previous));
    expect(activeSlideNumber(region)).toBe(3);
  });

  // TC-005 (AC-005): one indicator button per slide, only the active one is aria-current, click activates.
  it('should render one indicator per slide, mark the active one, and activate on click', () => {
    const { container } = renderCarousel({ slides: makeSlides(4), defaultIndex: 0 });
    const region = getRegion(container);

    const current = [1, 2, 3, 4].map((n) => indicator(region, n, 4));
    expect(current[0]).toHaveAttribute('aria-current', 'true');
    for (const i of [1, 2, 3]) {
      expect(current[i]).not.toHaveAttribute('aria-current', 'true');
    }

    fireEvent.click(indicator(region, 3, 4));
    expect(activeSlideNumber(region)).toBe(3);
    expect(indicator(region, 3, 4)).toHaveAttribute('aria-current', 'true');
  });

  // TC-006 (AC-006): autoPlay advances every interval; PlayPause toggles rotation and its own name.
  it('should auto-advance on an interval and toggle via PlayPause when autoPlay is true', () => {
    vi.useFakeTimers();
    const { container } = renderCarousel({
      slides: makeSlides(3),
      autoPlay: true,
      autoPlayInterval: 5000,
    });
    const region = getRegion(container);

    expect(activeSlideNumber(region)).toBe(1);
    act(() => vi.advanceTimersByTime(5000));
    expect(activeSlideNumber(region)).toBe(2);

    // Pause: name is t.pause while playing; clicking it stops advance and flips name to t.play.
    fireEvent.click(button(region, t.pause));
    expect(button(region, t.play)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(5000));
    expect(activeSlideNumber(region)).toBe(2);

    // Resume.
    fireEvent.click(button(region, t.play));
    act(() => vi.advanceTimersByTime(5000));
    expect(activeSlideNumber(region)).toBe(3);
  });

  // TC-007 (AC-006): hover and focus-within pause auto-rotation; leaving resumes it.
  it('should pause auto-rotation on hover or focus and resume on leave', () => {
    vi.useFakeTimers();
    const { container } = renderCarousel({
      slides: makeSlides(3),
      autoPlay: true,
      autoPlayInterval: 5000,
    });
    const region = getRegion(container);

    fireEvent.mouseEnter(region);
    act(() => vi.advanceTimersByTime(5000));
    expect(activeSlideNumber(region)).toBe(1);

    fireEvent.mouseLeave(region);
    act(() => vi.advanceTimersByTime(5000));
    expect(activeSlideNumber(region)).toBe(2);

    fireEvent.focus(region);
    act(() => vi.advanceTimersByTime(5000));
    expect(activeSlideNumber(region)).toBe(2);

    fireEvent.blur(region);
    act(() => vi.advanceTimersByTime(5000));
    expect(activeSlideNumber(region)).toBe(3);
  });

  // TC-008 (AC-006): autoPlay off -> no timer runs and no Play/Pause control is rendered.
  it('should never auto-advance nor render a PlayPause control when autoPlay is false', () => {
    vi.useFakeTimers();
    const { container } = renderCarousel({ slides: makeSlides(3) });
    const region = getRegion(container);

    act(() => vi.advanceTimersByTime(5000));
    expect(activeSlideNumber(region)).toBe(1);
    expect(queryButton(region, t.play)).toBeNull();
    expect(queryButton(region, t.pause)).toBeNull();
  });

  // TC-009 (AC-007): prefers-reduced-motion starts paused even with autoPlay; manual start works.
  it('should start paused under prefers-reduced-motion and allow a manual start', () => {
    const original = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: (query: string) => ({
        matches: query.includes('reduce'),
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      }),
    });

    try {
      vi.useFakeTimers();
      const { container } = renderCarousel({
        slides: makeSlides(3),
        autoPlay: true,
        autoPlayInterval: 5000,
      });
      const region = getRegion(container);

      expect(button(region, t.play)).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(5000));
      expect(activeSlideNumber(region)).toBe(1);

      fireEvent.click(button(region, t.play));
      act(() => vi.advanceTimersByTime(5000));
      expect(activeSlideNumber(region)).toBe(2);
    } finally {
      Object.defineProperty(window, 'matchMedia', { configurable: true, value: original });
    }
  });

  // TC-010 (AC-008): Track aria-live is "off" while playing, "polite" while paused/stopped.
  it('should toggle the track aria-live between off (playing) and polite (paused)', () => {
    vi.useFakeTimers();
    const { container } = renderCarousel({
      slides: makeSlides(3),
      autoPlay: true,
      autoPlayInterval: 5000,
    });
    const region = getRegion(container);

    const track = region.querySelector('[aria-live]');
    expect(track).not.toBeNull();
    expect(track).toHaveAttribute('aria-live', 'off');

    fireEvent.click(button(region, t.pause));
    expect(track).toHaveAttribute('aria-live', 'polite');
  });

  // TC-010 (AC-008): with autoPlay off the track is polite (manual navigation is announced).
  it('should keep the track aria-live polite when autoPlay is off', () => {
    const { container } = renderCarousel({ slides: makeSlides(3) });
    const track = getRegion(container).querySelector('[aria-live]');
    expect(track).toHaveAttribute('aria-live', 'polite');
  });

  // TC-011 (AC-009): ArrowRight/ArrowLeft move slides (with wrap) when focus is within the carousel.
  it('should move slides with ArrowRight and ArrowLeft while focus is inside', () => {
    const { container } = renderCarousel({ slides: makeSlides(3), defaultIndex: 0 });
    const region = getRegion(container);

    fireEvent.keyDown(region, { key: 'ArrowRight' });
    expect(activeSlideNumber(region)).toBe(2);
    fireEvent.keyDown(region, { key: 'ArrowRight' });
    fireEvent.keyDown(region, { key: 'ArrowRight' });
    expect(activeSlideNumber(region)).toBe(1);
    fireEvent.keyDown(region, { key: 'ArrowLeft' });
    expect(activeSlideNumber(region)).toBe(3);
  });

  // TC-011 (AC-009): Previous/Next and each indicator are real, tab-reachable <button>s.
  it('should render Previous, Next and indicators as tab-focusable buttons', () => {
    const { container } = renderCarousel({ slides: makeSlides(3) });
    const region = getRegion(container);

    for (const control of [
      button(region, t.previous),
      button(region, t.next),
      indicator(region, 1, 3),
    ]) {
      expect(control.tagName).toBe('BUTTON');
      expect(control).not.toHaveAttribute('tabindex', '-1');
    }
  });

  // TC-012 (AC-010): single slide -> one visible slide, all controls no-op, no autoplay, no throw.
  it('should treat a single slide as a no-op boundary without throwing', () => {
    vi.useFakeTimers();
    const render1 = () => renderCarousel({ slides: makeSlides(1), autoPlay: true });
    expect(render1).not.toThrow();

    const { container } = render1();
    const region = getRegion(container);
    expect(slideGroups(region)).toHaveLength(1);
    expect(activeSlideNumber(region)).toBe(1);

    fireEvent.click(button(region, t.next));
    expect(activeSlideNumber(region)).toBe(1);
    fireEvent.click(button(region, t.previous));
    expect(activeSlideNumber(region)).toBe(1);
    fireEvent.keyDown(region, { key: 'ArrowRight' });
    expect(activeSlideNumber(region)).toBe(1);

    act(() => vi.advanceTimersByTime(5000));
    expect(activeSlideNumber(region)).toBe(1);
  });

  // TC-013 (AC-010): empty slides -> region renders, no slide groups, no indicators, no throw.
  it('should render only the region for an empty slides array without throwing', () => {
    const renderEmpty = () => renderCarousel({ slides: [] });
    expect(renderEmpty).not.toThrow();

    const { container } = renderEmpty();
    const region = getRegion(container);
    expect(slideGroups(region)).toHaveLength(0);
    expect(within(region).queryAllByRole('button')).toHaveLength(0);
  });

  // TC-014 (AC-011): purity - reads labels only from `t`, never calls useTranslations itself.
  it('should read every label from the t prop and never import i18n itself', () => {
    const { container } = renderCarousel();
    const region = getRegion(container);
    expect(within(container).getByRole('region', { name: t.label })).toBe(region);
    expect(button(region, t.previous)).toBeInTheDocument();
    expect(button(region, t.next)).toBeInTheDocument();

    const dir = 'src/components/advanced/carousel';
    const source = readFileSync(`${dir}/carousel.tsx`, 'utf8');
    expect(source).not.toMatch(/useTranslations/);
    expect(existsSync(`${dir}/carousel.container.tsx`)).toBe(true);
  });

  // TC-015 (AC-002): caller className extends base styles on the region and on sub-parts.
  it('should merge caller className without dropping base classes', () => {
    const base = renderCarousel();
    const baseTokens = [...getRegion(base.container).classList];

    const custom = renderCarousel({ className: 'custom-region' });
    const region = getRegion(custom.container);
    expect(region.classList.contains('custom-region')).toBe(true);
    for (const token of baseTokens) expect(region.classList.contains(token)).toBe(true);

    const next = button(region, t.next);
    fireEvent.click(next);
    expect(next.className.split(/\s+/).filter(Boolean).length).toBeGreaterThan(0);
  });

  // TC-016 (AC-013): the default (autoPlay-off) render has no a11y violations.
  it('should have no accessibility violations on the default render', async () => {
    const { container } = renderCarousel({ slides: makeSlides(3) });
    const results = await waitFor(() => axe(container));
    expect(results).toHaveNoViolations();
  });

  // TC-016 (AC-013): the default render matches the committed snapshot.
  it('should match the snapshot on the default render', () => {
    const { container } = renderCarousel({ slides: makeSlides(3) });
    expect(container).toMatchSnapshot();
  });
});
