import { Payload, RequiredDataFromCollectionSlug } from 'payload';

const users: RequiredDataFromCollectionSlug<'users'>[] = [
  {
    name: 'Super Admin',
    email: 'superadmin@cms.com',
    password: 'password',
    roles: ['admin'],
  },
  {
    name: 'Some Editor',
    email: 'editor@cms.com',
    password: 'password',
    roles: ['editor'],
  },
  {
    name: 'Some User',
    email: 'user@cms.com',
    password: 'password',
    roles: ['user'],
  },
];

const seedUsers = async (payload: Payload) => {
  return Promise.all(
    users.map(async (it) => {
      const existing = await payload.find({
        collection: 'users',
        where: { email: { equals: it.email } },
        limit: 1,
      });
      if (existing.docs.length > 0) return existing.docs[0];
      return payload.create({ collection: 'users', depth: 0, data: it });
    }),
  );
};

export { seedUsers };
