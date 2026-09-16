// @lovable.dev/vite-tanstack-config already includes the required plugins.
// Do not add TanStack/Vite/React plugins manually.

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/melfie-supports-you/",
  },

  tanstackStart: {
    // Generate static HTML for GitHub Pages
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
    },

    server: { entry: "server" },
  },
});