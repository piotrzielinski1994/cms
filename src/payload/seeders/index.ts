import { Payload, PayloadRequest } from 'payload';
import { seedPages } from './pages';
import { seedUsers } from './users';

export const seed = async ({ payload }: { payload: Payload; req: PayloadRequest }) => {
  payload.logger.info('Seeding database...');

  await Promise.all([seedUsers, seedPages].map((cb) => cb(payload)));

  payload.logger.info('Seeded database successfully!');
};
