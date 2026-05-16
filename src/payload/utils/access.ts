import { User } from '@/payload.types';
import { Access, FieldAccess } from 'payload';

const hasRole = (user: User | null | undefined, role: NonNullable<User['roles']>[number]) => {
  return Boolean(user?.roles?.includes(role));
};

const anyone: Access = () => true;

const authenticated: Access = ({ req: { user } }) => {
  return Boolean(user);
};

const admin: Access = ({ req: { user } }) => {
  return hasRole(user, 'admin');
};

const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (hasRole(user, 'admin')) return true;
  return { id: { equals: user.id } };
};

const adminFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
  return hasRole(user, 'admin');
};

const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: 'published' } };
};

const isAdmin: Access = ({ req: { user } }) => {
  return hasRole(user, 'admin');
};

const adminOnlyFieldAccess: FieldAccess = ({ req: { user } }) => {
  return hasRole(user, 'admin');
};

const customerOnlyFieldAccess: FieldAccess = ({ req: { user } }) => {
  return hasRole(user, 'customer');
};

const adminOrPublishedStatus: Access = ({ req: { user } }) => {
  if (hasRole(user, 'admin')) return true;
  return { _status: { equals: 'published' } };
};

const isDocumentOwner: Access = ({ req: { user } }) => {
  if (hasRole(user, 'admin')) return true;
  if (user?.id) return { customer: { equals: user.id } };
  return false;
};

export {
  admin,
  adminFieldLevel,
  adminOnlyFieldAccess,
  adminOrPublishedStatus,
  adminOrSelf,
  anyone,
  authenticated,
  authenticatedOrPublished,
  customerOnlyFieldAccess,
  isAdmin,
  isDocumentOwner,
};
