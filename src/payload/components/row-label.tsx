'use client';

import { type RowLabelProps, useRowLabel } from '@payloadcms/ui';
import type { Header } from '@/payload.types';

const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>();
  const label = data?.data?.link?.label ?? 'Row';
  return <div>{label}</div>;
};

export { RowLabel };
