// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), react()],
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

