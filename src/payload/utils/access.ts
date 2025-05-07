import { User } from '@/payload.types';
import { Access, FieldAccess } from 'payload';

const anyone: Access = () => true;

const authenticated: Access = ({ req: { user } }) => {
  return Boolean(user);
};

const admin: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'));
};

const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.roles?.includes('admin')) return true;
  return { id: { equals: user.id } };
};

const adminFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'));
};

const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: 'published' } };
};

export { admin, adminFieldLevel, adminOrSelf, anyone, authenticated, authenticatedOrPublished };
