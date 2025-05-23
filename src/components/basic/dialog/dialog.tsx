import { cn } from '@/utils/tailwind';
import { ComponentPropsWithoutRef } from 'react';
import { Container } from '../container';
import { Section } from '../section';

type DialogProps = ComponentPropsWithoutRef<'dialog'>;

const Root = ({ className, ...rest }: DialogProps) => {
  return (
    <>
      <Backdrop />
      <Section as="div" className={cn('fixed inset-0 z-dialog', 'py-4 sm:py-6')}>
        <Container {...rest} as="dialog" open className={cn('relative', className)} />
      </Section>
    </>
  );
};

const Backdrop = () => {
  return <div className="fixed inset-0 z-backdrop bg-black/50 backdrop-blur-sm" />;
};

const Dialog = { Root, Backdrop };
export default Dialog;
