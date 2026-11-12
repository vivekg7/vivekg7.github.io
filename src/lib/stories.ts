import { getCollection, type CollectionEntry } from "astro:content";

export type Story = CollectionEntry<"stories">;

// The talekit project's colour: the stories are what talekit makes.
export const STORY_ACCENT = "#7a4cc2";
export const CHANNEL = "https://www.youtube.com/@KahaniKiPotli7";

/** Every story, newest first. */
export async function getStories(): Promise<Story[]> {
  return (await getCollection("stories")).sort(
    (a, b) =>
      b.data.published.getTime() - a.data.published.getTime() ||
      a.data.title.localeCompare(b.data.title),
  );
}

/** 277 → "4:37" */
export function clock(seconds: number): string {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** 277 → "4 min 37 s", for screen readers and titles. */
export function spoken(seconds: number): string {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)} min ${s % 60} s`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const watchUrl = (id: string, start = 0) =>
  `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ""}`;
export const shortUrl = (id: string) => `https://www.youtube.com/shorts/${id}`;
