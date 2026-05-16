import { Payload, PayloadRequest } from 'payload';
import { seedLayoutItems } from './layout';
import { seedPages } from './pages';
import { seedProducts } from './products';
import { seedProductsPages } from './products-pages';
import { seedUsers } from './users';

const seed = async ({ payload, req }: { payload: Payload; req?: PayloadRequest }) => {
  payload.logger.info('Seeding database...');

  await seedUsers(payload);
  await seedPages(payload);
  await seedLayoutItems(payload);
  await seedProducts(payload, req);
  await seedProductsPages(payload);

  payload.logger.info('Seeded database successfully!');
};

export { seed };
