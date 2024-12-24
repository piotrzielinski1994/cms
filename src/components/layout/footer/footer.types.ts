import { DataFromGlobalSlug, TypedLocale } from 'payload';

export interface FooterProps {
  locale: TypedLocale;
}

export interface FooterClientProps {
  data: DataFromGlobalSlug<'footer'>;
}
