import type { User } from '@/payload.types';
import type { AccessArgs } from 'payload';

type isAuthenticated = (args: AccessArgs<User>) => boolean;

const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user);
};

export { authenticated };
