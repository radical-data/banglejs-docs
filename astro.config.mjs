// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import path from "node:path";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        $src: path.resolve("./src"),
        $assets: path.resolve("./src/assets"),
      },
    },
  },
  integrations: [
    starlight({
      title: "Bangle.js Documentation",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/radical-data/banglejs-docs",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/radical-data/banglejs-docs/edit/main/",
      },
      sidebar: [
        { label: "Initial Setup", link: "/initial-setup" },
        {
          label: "Tutorials",
          items: [
          ],
        },
        {
          label: "How-to Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
        {
          label: "Explanations",
          autogenerate: { directory: "explanations" },
        },
      ],
    }),
  ],
});
