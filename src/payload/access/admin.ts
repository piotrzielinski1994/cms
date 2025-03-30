import type { AccessArgs } from 'payload';

import type { User } from '@/payload.types';

export const admin = ({ req: { user } }: AccessArgs<User>): boolean => {
  return Boolean(user?.roles?.includes('admin'));
};
