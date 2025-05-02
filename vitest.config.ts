import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'svg-mock',
      enforce: 'pre',
      resolveId: (source) => {
        if (!source.endsWith('.svg')) return;
        return `data:text/javascript,export default () => '[Svg ${source}]'`;
      },
    },
    react(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    env: loadEnv('', process.cwd(), ''),
    setupFiles: ['./vitest.setup.ts'],
    resolveSnapshotPath: (testPath) => `${testPath}.snap`,
    server: {
      deps: {
        inline: ['next-intl'], // https://github.com/vercel/next.js/issues/77200
      },
    },
  },
});
