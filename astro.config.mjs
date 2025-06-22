// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import path from "node:path";
import netlify from "@astrojs/netlify";

export default defineConfig({
  site: "https://banglejs.radicaldata.org",

  adapter: netlify(),

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
            { label: "Write Your First App", link: "tutorials/first-app" },
            {
              label: "Build a Custom Watchface",
              link: "tutorials/custom-watchface",
            },
            {
              label: "Show Data on Your Watchface",
              link: "tutorials/add-clock-info",
            },
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

  vite: {
    resolve: {
      alias: {
        $src: path.resolve("./src"),
        $assets: path.resolve("./src/assets"),
      },
    },
  },
});
