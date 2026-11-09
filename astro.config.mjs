// @ts-check
import { defineConfig } from "astro/config";

// A user site (vivekg7.github.io) is served from the domain root, so no `base`.
export default defineConfig({
  site: "https://vivekg7.github.io",
  trailingSlash: "ignore",
});
