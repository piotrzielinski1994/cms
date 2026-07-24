'use client';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cn } from '@/utils/tailwind';

const styles = {
  content: cn(
    'bg-background1 text-foreground',
    'z-popover min-w-40 overflow-hidden rounded p-1',
    'shadow-md',
  ),
  item: cn(
    'flex items-center gap-2 rounded px-2 py-1.5',
    'text-sm outline-none cursor-pointer select-none',
    'focus:bg-accent focus:text-accent-foreground',
    'focus-visible:tw-cms-outline',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ),
  label: cn('px-2 py-1.5', 'text-sm font-semibold'),
  separator: cn('-mx-1 my-1 h-px', 'bg-input'),
} as const;

const Root = ({ modal = false, ...rest }: ComponentProps<typeof DropdownMenuPrimitive.Root>) => (
  <DropdownMenuPrimitive.Root modal={modal} {...rest} />
);

const Trigger = DropdownMenuPrimitive.Trigger;

const Group = DropdownMenuPrimitive.Group;

const Content = ({
  className,
  sideOffset = 4,
  ...rest
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      sideOffset={sideOffset}
      className={cn(styles.content, className)}
      {...rest}
    />
  </DropdownMenuPrimitive.Portal>
);

const Item = ({ className, ...rest }: ComponentProps<typeof DropdownMenuPrimitive.Item>) => (
  <DropdownMenuPrimitive.Item className={cn(styles.item, className)} {...rest} />
);

const Label = ({ className, ...rest }: ComponentProps<typeof DropdownMenuPrimitive.Label>) => (
  <DropdownMenuPrimitive.Label className={cn(styles.label, className)} {...rest} />
);

const Separator = ({
  className,
  ...rest
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) => (
  <DropdownMenuPrimitive.Separator className={cn(styles.separator, className)} {...rest} />
);

const DropdownMenu = Object.assign(Root, {
  Root,
  Trigger,
  Content,
  Item,
  Separator,
  Label,
  Group,
});

export { DropdownMenu, styles };
