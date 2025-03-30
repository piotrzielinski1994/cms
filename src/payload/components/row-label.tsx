'use client';

import { Header } from '@/payload.types';
import { RowLabelProps, useRowLabel } from '@payloadcms/ui';

const RowLabel: React.FC<RowLabelProps> = (props) => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>();
  const label = data?.data?.link?.label ?? 'Row';

  return <div>{label}</div>;
};

export { RowLabel };
