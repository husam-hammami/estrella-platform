import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mockupPreviewPlugin from "./mockupPreviewPlugin";

// Vite config for the Canvas-sandbox mockup. Single-entry React + TS app.
// The mockupPreviewPlugin injects the sandbox-friendly iframe wiring so the
// build can be embedded as a shape on the Canvas board.
export default defineConfig({
  plugins: [react(), mockupPreviewPlugin()],
  base: "./",
  server: { host: true, port: 5173 },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
