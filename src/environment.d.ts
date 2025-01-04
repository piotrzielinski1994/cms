declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string;
      DATABASE_URI: string;
      NEXT_PUBLIC_SERVER_URL: string;
      VERCEL_PROJECT_PRODUCTION_URL: string;
      NEXT_PUBLIC_FEATURE_ADMIN_LOCALES: string;
      NEXT_PUBLIC_FEATURE_DEFAULT_ADMIN_LOCALE: string;
      NEXT_PUBLIC_FEATURE_CONTENT_LOCALES: string;
      NEXT_PUBLIC_FEATURE_DEFAULT_CONTENT_LOCALE: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
