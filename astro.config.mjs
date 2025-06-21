// @ts-check
import { defineConfig, sharpImageService } from "astro/config";
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
  image: {
    service: sharpImageService(),
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
});
