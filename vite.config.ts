import { defineConfig } from 'vite';

// Vite configuration for building the COF V2 system. The entry point is the
// main TypeScript file in `systems/cof-v2/src/module/cofv2.ts`. Output
// bundles are written to `systems/cof-v2/dist`.

export default defineConfig({
  build: {
    outDir: 'systems/cof-v2/dist',
    emptyOutDir: true,
    lib: {
      entry: 'systems/cof-v2/src/module/cofv2.ts',
      name: 'cofv2',
      formats: ['es'],
      fileName: () => 'cofv2.js'
    },
    rollupOptions: {
      // Ensure external dependencies (like Foundry's global) are not bundled.
      external: ['foundry']
    }
  }
});
