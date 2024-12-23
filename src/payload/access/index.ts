import { admin } from './admin';
import { adminFieldLevel } from './adminFieldLevel';
import { adminOrSelf } from './adminOrSelf';
import { anyone } from './anyone';
import { authenticated } from './authenticated';
import { authenticatedOrPublished } from './authenticatedOrPublished';

export const access = {
  admin,
  adminFieldLevel,
  adminOrSelf,
  anyone,
  authenticated,
  authenticatedOrPublished,
};
