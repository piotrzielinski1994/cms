import { Payload, PayloadRequest } from 'payload';
import { seedLayoutItems } from './layout';
import { seedPages } from './pages';
import { seedUsers } from './users';

export const seed = async ({ payload }: { payload: Payload; req?: PayloadRequest }) => {
  payload.logger.info('Seeding database...');

  try {
    await seedUsers(payload);
    await seedPages(payload);
    await seedLayoutItems(payload);
  } catch (e) {
    console.log('@@@ e | ', e);
  }

  payload.logger.info('Seeded database successfully!');
};
