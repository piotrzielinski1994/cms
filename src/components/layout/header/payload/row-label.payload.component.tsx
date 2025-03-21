'use client';
import { Header } from '@/payload/payload.types';
import { RowLabelProps, useRowLabel } from '@payloadcms/ui';

export const RowLabel: React.FC<RowLabelProps> = (props) => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>();
  const label = data?.data?.link?.label ? data?.data?.link?.label : 'Row';

  return <div>{label}</div>;
};
