import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// Vite configuration for building as a library
export default defineConfig({
  plugins: [
    dts({
      include: ['src/rating-component.ts'],
      tsconfigPath: './tsconfig.lib.json',
      rollupTypes: true,
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: './src/rating-component.ts',
      name: 'RatingComponent',
      formats: ['es'],
      fileName: 'rating-component'
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: ['lit', 'lit/decorators.js', 'lit/directives/class-map.js'],
      output: {
        // Provide global variables for externalized deps in UMD build
        globals: {
          lit: 'Lit'
        }
      }
    },
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true
  }
});
