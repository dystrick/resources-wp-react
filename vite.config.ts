import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Get the mode from environment
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  envPrefix: "RESOURCES_WP_PUBLIC_",
  server: {
    proxy:
      mode === "development"
        ? {
            "/wp-json": {
              target: "https://nolan.dystrick.dev",
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ResourcesWpReact",
      formats: ["es", "umd"],
      fileName: (format) => `resources-wp-react.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
}));
