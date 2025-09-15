// componentTagger is loaded dynamically to support ESM-only package
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins = [react(), tsconfigPaths()];

  if (mode === 'development') {
    const { componentTagger } = await import('lovable-tagger');
    plugins.splice(1, 0, componentTagger());
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
      chunkSizeWarningLimit: 2000,
    },
  };
});