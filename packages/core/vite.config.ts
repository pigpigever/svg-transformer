import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SVG2Img',
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
          name: 'SVG2Img',
          globals: {},
        },
      ],
    }
  }
});