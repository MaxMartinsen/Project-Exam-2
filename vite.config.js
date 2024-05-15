import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Project-Exam-2/",
  plugins: [react(), Inspect()],
});
