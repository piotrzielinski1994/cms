import { ComponentPropsWithoutRef } from 'react';

export interface ContainerProps extends ComponentPropsWithoutRef<'section'> {
  as?: keyof HTMLElementTagNameMap;
}
