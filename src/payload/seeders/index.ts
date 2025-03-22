import { Payload, PayloadRequest } from 'payload';
import { seedLayoutItems } from './layout';
import { seedPages } from './pages';
import { seedUsers } from './users';

export const seed = async ({ payload }: { payload: Payload; req?: PayloadRequest }) => {
  payload.logger.info('Seeding database...');

  await seedUsers(payload);
  await seedPages(payload);
  await seedLayoutItems(payload);

  payload.logger.info('Seeded database successfully!');
};
