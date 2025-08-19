import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'svg-transformer',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      input: 'src/index.ts',
      output: [
        {
          format: 'es',
          dir: 'dist/esm',
          entryFileNames: '[name].js',
          preserveModules: true,
        },
        {
          format: 'umd',
          dir: 'dist/umd',
          entryFileNames: '[name].js',
          name: 'svg-transformer',
          globals: {},
        },
      ],
    }
  }
});