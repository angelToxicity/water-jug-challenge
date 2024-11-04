import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  resolve: {
    alias: {
      crypto: "crypto-browserify"
    }
  },
  plugins: [
    nodePolyfills()
  ],
})