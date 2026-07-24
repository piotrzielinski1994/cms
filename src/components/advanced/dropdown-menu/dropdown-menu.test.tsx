import { existsSync, readFileSync } from 'node:fs';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { withProviders } from '@/utils/tests';
import { DropdownMenu, styles } from './dropdown-menu';

const TRIGGER = 'Actions';

type MenuArgs = {
  triggerClassName?: string;
  contentClassName?: string;
  firstItemClassName?: string;
  onEdit?: () => void;
  onArchive?: () => void;
};

const Menu = ({ contentClassName, firstItemClassName, onEdit, onArchive }: MenuArgs = {}) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>{TRIGGER}</DropdownMenu.Trigger>
    <DropdownMenu.Content className={contentClassName} aria-label="Row actions">
      <DropdownMenu.Item className={firstItemClassName} onSelect={onEdit}>
        Edit
      </DropdownMenu.Item>
      <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
      <DropdownMenu.Item disabled onSelect={onArchive}>
        Archive
      </DropdownMenu.Item>
      <DropdownMenu.Item>Delete</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
);

const renderMenu = (args: MenuArgs = {}) => render(withProviders(<Menu {...args} />));

const classesOf = (el: Element) => new Set(el.className.split(/\s+/).filter(Boolean));

describe('DropdownMenu', () => {
  // TC-001 (AC-001, AC-003): named import resolves and the menu is closed by default -
  // only the trigger is in the DOM, no role="menu" is mounted yet.
  it('should render only the trigger and mount no menu if not yet opened', () => {
    const { getByRole, queryByRole } = renderMenu();

    expect(getByRole('button', { name: TRIGGER })).toBeInTheDocument();
    expect(queryByRole('menu')).toBeNull();
    expect(queryByRole('menuitem')).toBeNull();
  });

  // TC-002 (AC-002, AC-003): clicking the trigger opens a portalled role="menu"
  // containing one role="menuitem" per Item.
  it('should open a portalled menu with one menuitem per item if the trigger is clicked', async () => {
    const user = userEvent.setup();
    const { getByRole, findByRole, findAllByRole } = renderMenu();

    await user.click(getByRole('button', { name: TRIGGER }));

    expect(await findByRole('menu')).toBeInTheDocument();
    expect(await findAllByRole('menuitem')).toHaveLength(4);
  });

  // TC-002 (AC-002): the compound exposes and renders every required sub-part
  // (Root, Trigger, Content, Item, Separator, Label, Group).
  it('should render every compound sub-part if hand-composed', async () => {
    const user = userEvent.setup();
    const { getByRole, findByRole, findByText } = render(
      withProviders(
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>{TRIGGER}</DropdownMenu.Trigger>
          <DropdownMenu.Content aria-label="Row actions">
            <DropdownMenu.Label>Section</DropdownMenu.Label>
            <DropdownMenu.Group>
              <DropdownMenu.Item>Edit</DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Delete</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>,
      ),
    );

    await user.click(getByRole('button', { name: TRIGGER }));

    const menu = await findByRole('menu');
    expect(await findByText('Section')).toBeInTheDocument();
    expect(menu.querySelector('[role="group"]')).not.toBeNull();
    expect(menu.querySelector('[role="separator"]')).not.toBeNull();
  });

  // TC-003 (AC-004): activating an item fires its onSelect once and closes the menu.
  it('should fire the item onSelect once and close the menu if the item is activated', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const { getByRole, findByRole, queryByRole } = renderMenu({ onEdit });

    await user.click(getByRole('button', { name: TRIGGER }));
    await findByRole('menu');
    await user.click(getByRole('menuitem', { name: 'Edit' }));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(queryByRole('menu')).toBeNull();
  });

  // TC-004 (AC-003): Escape closes the menu and returns focus to the trigger.
  it('should close the menu and return focus to the trigger if Escape is pressed', async () => {
    const user = userEvent.setup();
    const { getByRole, findByRole, queryByRole } = renderMenu();
    const trigger = getByRole('button', { name: TRIGGER });

    await user.click(trigger);
    await findByRole('menu');
    await user.keyboard('{Escape}');

    expect(queryByRole('menu')).toBeNull();
    expect(trigger).toHaveFocus();
  });

  // AC-004: opening via keyboard highlights/focuses the first item; ArrowDown roves
  // to the next enabled item and skips the disabled one.
  it('should rove focus with ArrowDown and skip the disabled item', async () => {
    const user = userEvent.setup();
    const { getByRole, findByRole } = renderMenu();
    const trigger = getByRole('button', { name: TRIGGER });

    trigger.focus();
    await user.keyboard('{Enter}');
    await findByRole('menu');

    const edit = getByRole('menuitem', { name: 'Edit' });
    expect(edit).toHaveFocus();
    expect(edit).toHaveAttribute('data-highlighted');

    await user.keyboard('{ArrowDown}');
    expect(getByRole('menuitem', { name: 'Duplicate' })).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
    expect(getByRole('menuitem', { name: 'Archive' })).not.toHaveFocus();
  });

  // AC-004: ArrowUp roves focus back to the previous enabled item, skipping the disabled one.
  it('should rove focus back with ArrowUp and skip the disabled item', async () => {
    const user = userEvent.setup();
    const { getByRole, findByRole } = renderMenu();
    const trigger = getByRole('button', { name: TRIGGER });

    trigger.focus();
    await user.keyboard('{Enter}');
    await findByRole('menu');

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowDown}');
    expect(getByRole('menuitem', { name: 'Delete' })).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(getByRole('menuitem', { name: 'Duplicate' })).toHaveFocus();
    expect(getByRole('menuitem', { name: 'Archive' })).not.toHaveFocus();
  });

  // TC-005 (AC-004): a disabled item exposes aria-disabled/data-disabled, is skipped by
  // roving focus, and clicking it neither fires onSelect nor closes the menu.
  it('should expose a disabled item as non-interactive and keep the menu open if it is clicked', async () => {
    const user = userEvent.setup();
    const onArchive = vi.fn();
    const { getByRole, findByRole, queryByRole } = renderMenu({ onArchive });

    await user.click(getByRole('button', { name: TRIGGER }));
    await findByRole('menu');

    const archive = getByRole('menuitem', { name: 'Archive' });
    expect(archive).toHaveAttribute('aria-disabled', 'true');
    expect(archive).toHaveAttribute('data-disabled');

    await user.click(archive);

    expect(onArchive).not.toHaveBeenCalled();
    expect(queryByRole('menu')).not.toBeNull();
  });

  // TC-006 (AC-002, AC-005): caller className on Content and Item extends the base styles
  // classes without dropping them.
  it('should merge caller className into Content and Item without dropping base classes', async () => {
    const user = userEvent.setup();

    const base = renderMenu();
    await user.click(base.getByRole('button', { name: TRIGGER }));
    const baseMenu = await base.findByRole('menu');
    const baseContentClasses = classesOf(baseMenu);
    const baseItemClasses = classesOf(base.getByRole('menuitem', { name: 'Edit' }));

    const custom = renderMenu({ contentClassName: 'custom-x', firstItemClassName: 'custom-y' });
    const triggers = custom.getAllByRole('button', { name: TRIGGER });
    await user.click(triggers[triggers.length - 1]);
    const customMenus = await custom.findAllByRole('menu');
    const customMenu = customMenus[customMenus.length - 1];

    expect(customMenu.classList.contains('custom-x')).toBe(true);
    for (const cls of baseContentClasses) {
      expect(customMenu.classList.contains(cls)).toBe(true);
    }

    const customItem = custom
      .getAllByRole('menuitem', { name: 'Edit' })
      .find((el) => el.classList.contains('custom-y'));
    expect(customItem).toBeDefined();
    for (const cls of baseItemClasses) {
      expect(customItem?.classList.contains(cls)).toBe(true);
    }
  });

  // AC-005 / AC-001: the module exports a styles object alongside the component.
  it('should export a styles object', () => {
    expect(styles).toBeDefined();
    expect(typeof styles).toBe('object');
  });

  // TC-011 (AC-010): purity - renders with caller-only labels without throwing, and the
  // module neither reads i18n (useTranslations) nor has a *.container.tsx sibling.
  it('should render with caller-only labels and stay free of i18n and any container file', () => {
    expect(() => renderMenu()).not.toThrow();

    const dir = 'src/components/advanced/dropdown-menu';
    const source = readFileSync(`${dir}/dropdown-menu.tsx`, 'utf8');
    expect(source).not.toMatch(/useTranslations/);
    expect(existsSync(`${dir}/dropdown-menu.container.tsx`)).toBe(false);
  });

  // TC-012 (AC-013): the open menu has no accessibility violations.
  it('should have no accessibility violations if the menu is open', async () => {
    const user = userEvent.setup();
    const { getByRole, findByRole } = renderMenu();

    await user.click(getByRole('button', { name: TRIGGER }));
    const menu = await findByRole('menu');

    const results = await axe(menu);
    expect(results).toHaveNoViolations();
  });

  // TC-013 (AC-013): the closed (default) render matches the committed snapshot.
  it('should match the snapshot in its closed state', () => {
    const { container } = renderMenu();
    expect(container).toMatchSnapshot();
  });
});
