import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";
import vitePrerender from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemap({
      hostname: "https://university.infracodebase.com",
      dynamicRoutes: [
        "/",
        "/manifesto",
        "/curriculum",
        "/training",
        "/hands-on",
        "/path/cloud-infrastructure-intro",
        "/workshops",
        "/videos",
        "/events",
        "/cards",
        "/sign-in",
      ],
      changefreq: "weekly",
      priority: {
        "/": 1.0,
        "/curriculum": 0.9,
        "/training": 0.9,
        "/hands-on": 0.9,
        "/manifesto": 0.8,
        "/workshops": 0.8,
        "/videos": 0.7,
        "/events": 0.7,
        "/cards": 0.7,
        "/path/cloud-infrastructure-intro": 0.8,
        "/sign-in": 0.3,
      },
    }),
    vitePrerender({
      staticDir: path.join(__dirname, "dist"),
      routes: [
        "/",
        "/manifesto",
        "/curriculum",
        "/training",
        "/hands-on",
        "/path/cloud-infrastructure-intro",
        "/workshops",
        "/videos",
        "/events",
        "/cards",
        "/sign-in",
      ],
    }),
  ].filter(Boolean),
  build: {
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
