import { cloud } from './cloud';
import { ecommerce } from './ecommerce';
import { formBuilder } from './form-builder';
import { nestedDocs } from './nested-docs';
import { redirects } from './redirects';
import { seo } from './seo';
import { vercelStorage } from './vercel-storage';

const plugins = {
  cloud,
  nestedDocs,
  redirects,
  seo,
  formBuilder,
  vercelStorage,
  ecommerce,
};

export { plugins };
