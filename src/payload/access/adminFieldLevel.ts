import { User } from '@/payload.types';
import { FieldAccess } from 'payload';

export const adminFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'));
};
