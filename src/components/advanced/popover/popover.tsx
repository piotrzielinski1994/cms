'use client';

import { Popover as PopoverPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cn } from '@/utils/tailwind';

const styles = {
  content: cn(
    'bg-background1 text-foreground',
    'z-popover w-72 rounded p-4',
    'shadow-md',
    'focus-visible:tw-cms-outline',
  ),
  arrow: cn('fill-background1'),
} as const;

const Root = PopoverPrimitive.Root;

const Trigger = PopoverPrimitive.Trigger;

const Anchor = PopoverPrimitive.Anchor;

const Close = PopoverPrimitive.Close;

const Content = ({
  className,
  sideOffset = 4,
  ...rest
}: ComponentProps<typeof PopoverPrimitive.Content>) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      sideOffset={sideOffset}
      className={cn(styles.content, className)}
      {...rest}
    />
  </PopoverPrimitive.Portal>
);

const Arrow = ({ className, ...rest }: ComponentProps<typeof PopoverPrimitive.Arrow>) => (
  <PopoverPrimitive.Arrow className={cn(styles.arrow, className)} {...rest} />
);

const Popover = Object.assign(Root, {
  Root,
  Trigger,
  Content,
  Close,
  Anchor,
  Arrow,
});

export { Popover, styles };
