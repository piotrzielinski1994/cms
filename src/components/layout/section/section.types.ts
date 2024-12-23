import { ComponentPropsWithoutRef } from 'react';

export interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  as?: keyof HTMLElementTagNameMap;
}
