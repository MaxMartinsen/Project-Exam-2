import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,
    supportFile: false,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
