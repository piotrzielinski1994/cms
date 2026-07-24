import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import { en } from '@/payload/locale/en';
import { pl } from '@/payload/locale/pl';
import { withProviders } from '@/utils/tests';
import meta, { Popover as PopoverStory } from './popover.stories';

describe('Popover story', () => {
  // TC-014 (AC-011): the story is titled "Advanced/Popover".
  it('should be titled "Advanced/Popover"', () => {
    expect(meta.title).toBe('Advanced/Popover');
  });

  // TC-014 (AC-012): the storybook.advanced.popover label group is present in both locales.
  it('should expose the popover story-label keys in both en and pl', () => {
    expect(en.storybook.advanced.popover).toBeDefined();
    expect(pl.storybook.advanced.popover).toBeDefined();
    expect(Object.keys(pl.storybook.advanced.popover).sort()).toEqual(
      Object.keys(en.storybook.advanced.popover).sort(),
    );
  });

  // TC-014 (AC-011): the story renders an interactive trigger that opens the popover content,
  // with real translation copy (never the fallback sentinel).
  it('should render a trigger that opens the popover content', async () => {
    const user = userEvent.setup();
    const Render = PopoverStory.render as ComponentType<Record<string, unknown>>;
    const { container, getAllByRole, findByRole } = render(
      withProviders(<Render {...(meta.args ?? {})} />),
    );

    const trigger = getAllByRole('button')[0];
    await user.click(trigger);

    expect(await findByRole('dialog')).toBeInTheDocument();
    expect(container.textContent ?? '').not.toContain('__default__');
  });
});
