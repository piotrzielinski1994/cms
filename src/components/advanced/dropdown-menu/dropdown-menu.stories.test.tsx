import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import { en } from '@/payload/locale/en';
import { pl } from '@/payload/locale/pl';
import { withProviders } from '@/utils/tests';
import meta, { DropdownMenu as DropdownMenuStory } from './dropdown-menu.stories';

describe('DropdownMenu story', () => {
  // TC-014 (AC-011): the story is titled "Advanced/Dropdown Menu".
  it('should be titled "Advanced/Dropdown Menu"', () => {
    expect(meta.title).toBe('Advanced/Dropdown Menu');
  });

  // TC-014 (AC-012): the storybook.advanced.dropdownMenu label group is present in both locales.
  it('should expose the dropdownMenu story-label keys in both en and pl', () => {
    expect(en.storybook.advanced.dropdownMenu).toBeDefined();
    expect(pl.storybook.advanced.dropdownMenu).toBeDefined();
    expect(Object.keys(pl.storybook.advanced.dropdownMenu).sort()).toEqual(
      Object.keys(en.storybook.advanced.dropdownMenu).sort(),
    );
  });

  // TC-014 (AC-011): the story renders an interactive trigger that opens a menu of items,
  // with real translation copy (never the fallback sentinel).
  it('should render a trigger that opens a menu of items', async () => {
    const user = userEvent.setup();
    const Render = DropdownMenuStory.render as ComponentType<Record<string, unknown>>;
    const { container, getAllByRole, findByRole, findAllByRole } = render(
      withProviders(<Render {...(meta.args ?? {})} />),
    );

    const trigger = getAllByRole('button')[0];
    await user.click(trigger);

    expect(await findByRole('menu')).toBeInTheDocument();
    expect((await findAllByRole('menuitem')).length).toBeGreaterThan(0);
    expect(container.textContent ?? '').not.toContain('__default__');
  });
});
