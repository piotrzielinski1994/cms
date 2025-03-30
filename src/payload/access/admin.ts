import type { User } from '@/payload.types';
import type { AccessArgs } from 'payload';

const admin = ({ req: { user } }: AccessArgs<User>): boolean => {
  return Boolean(user?.roles?.includes('admin'));
};

export { admin };
