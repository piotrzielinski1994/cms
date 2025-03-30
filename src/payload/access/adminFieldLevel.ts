import { User } from '@/payload.types';
import { FieldAccess } from 'payload';

const adminFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'));
};

export { adminFieldLevel };
