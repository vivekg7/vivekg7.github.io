import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One Markdown file per project. Frontmatter drives the cards and the page
// header; the Markdown body is the long-form write-up on the project's page.
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      // "featured" projects get a large card and their own page; "more" get a
      // compact row that links straight to the repository.
      tier: z.enum(["featured", "more"]),
      // Lower sorts first within a tier.
      order: z.number(),
      // Until a featured project's write-up exists, its card links to GitHub.
      page: z.boolean().default(false),
      // Card and page accent, so each project keeps its own colour.
      accent: z.string().default("#b4532a"),
      year: z.number(),
      platforms: z.array(z.string()).default([]),
      stack: z.array(z.string()).default([]),
      status: z.string().optional(),
      repo: z.string().url(),
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
      // Short, checkable numbers ("97 KB", "0 permissions") shown as a strip.
      facts: z
        .array(z.object({ value: z.string(), label: z.string() }))
        .default([]),
      cover: z.object({ src: image(), alt: z.string() }).optional(),
      screenshots: z
        .array(z.object({ src: image(), alt: z.string() }))
        .default([]),
    }),
});

export const collections = { projects };
