import { DataFromGlobalSlug, TypedLocale } from 'payload';

export interface HeaderProps {
  locale: TypedLocale;
}

export interface HeaderClientProps {
  data: DataFromGlobalSlug<'header'>;
}
