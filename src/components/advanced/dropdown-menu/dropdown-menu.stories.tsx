import type { Meta, StoryObj } from '@storybook/react';
import { useTranslations } from 'next-intl';
import { DEFAULT_VALUE, getFallback } from '@/config/storybook/utils';
import { DropdownMenu as DropdownMenuComponent } from './dropdown-menu';

type Args = {
  trigger: string;
  edit: string;
  duplicate: string;
  archive: string;
  delete: string;
};

const meta = {
  title: 'Advanced/Dropdown Menu',
  args: {
    trigger: DEFAULT_VALUE,
    edit: DEFAULT_VALUE,
    duplicate: DEFAULT_VALUE,
    archive: DEFAULT_VALUE,
    delete: DEFAULT_VALUE,
  },
} satisfies Meta<Args>;

const Render = (args: Args) => {
  const t = useTranslations('storybook.advanced.dropdownMenu');
  const trigger = getFallback(args.trigger, t('trigger'));

  return (
    <DropdownMenuComponent.Root>
      <DropdownMenuComponent.Trigger>{trigger}</DropdownMenuComponent.Trigger>
      <DropdownMenuComponent.Content aria-label={trigger}>
        <DropdownMenuComponent.Item>{getFallback(args.edit, t('edit'))}</DropdownMenuComponent.Item>
        <DropdownMenuComponent.Item>
          {getFallback(args.duplicate, t('duplicate'))}
        </DropdownMenuComponent.Item>
        <DropdownMenuComponent.Item disabled>
          {getFallback(args.archive, t('archive'))}
        </DropdownMenuComponent.Item>
        <DropdownMenuComponent.Separator />
        <DropdownMenuComponent.Item>
          {getFallback(args.delete, t('delete'))}
        </DropdownMenuComponent.Item>
      </DropdownMenuComponent.Content>
    </DropdownMenuComponent.Root>
  );
};

const DropdownMenu: StoryObj<Args> = { render: Render };

export { DropdownMenu };
export default meta;
