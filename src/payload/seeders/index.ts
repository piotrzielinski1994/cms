import { Payload, PayloadRequest } from 'payload';
import { seedLayoutItems } from './layout';
import { seedPages } from './pages';
import { seedUsers } from './users';

export const seed = async ({ payload }: { payload: Payload; req: PayloadRequest }) => {
  payload.logger.info('Seeding database...');

  const [_1, [_2, ...pages]] = await Promise.all([seedUsers, seedPages].map((cb) => cb(payload)));
  await Promise.all([seedLayoutItems(pages)].map((cb) => cb(payload)));

  payload.logger.info('Seeded database successfully!');
};
