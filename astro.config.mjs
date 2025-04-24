// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://www.tmuxreference.com",
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date("2025-04-20"),
    }),
    mdx(),
    react(),
  ],
  env: {
    schema: {
      FATHOM_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
});
