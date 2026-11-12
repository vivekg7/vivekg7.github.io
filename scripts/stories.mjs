#!/usr/bin/env node
// Brings src/content/stories/ up to date with the Kahani ki Potli channel.
//
//   - A film on the channel with no story file gets one, drafted from its YouTube
//     title, description and chapters, plus its cover in src/assets/stories/.
//   - A story whose reel has since gone up as a Short gets the Short's id.
//
// Existing files are otherwise left alone: once written, a story file is edited
// by hand, because the channel's descriptions don't all follow one layout and
// the draft needs checking. Every draft field the script couldn't find is
// printed at the end.
//
// Needs yt-dlp on PATH. Run with `npm run stories`.

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const CHANNEL = "https://www.youtube.com/@KahaniKiPotli7";
const STORIES = "src/content/stories";
const COVERS = "src/assets/stories";

// Checked in order: a "moral story" from the Panchatantra is a Panchatantra story.
// The keys must match the `collection` enum in src/content.config.ts.
const COLLECTIONS = [
  ["panchatantra", /panchatantra|पंचतंत्र/i],
  ["jataka", /jataka|जातक/i],
  ["tenali-rama", /tenali|तेनाली/i],
  ["akbar-birbal", /birbal|बीरबल/i],
  ["mahabharata", /mahabharata|महाभारत/i],
  ["tolstoy", /tolstoy|टॉल्स्टॉय/i],
  ["moral", /moral|नैतिक/i],
];

const DEVANAGARI = /[ऀ-ॿ]/;
const TIMESTAMP = /^(?:(\d+):)?(\d{1,2}):(\d{2})\s+(.+)$/;

const ytdlp = (...args) =>
  execFileSync("yt-dlp", args, { encoding: "utf8", maxBuffer: 64 << 20 });

/** The channel's films or Shorts, newest first, with their English titles. */
function list(tab) {
  return ytdlp(
    "--flat-playlist",
    "--print",
    "%(id)s\t%(title)s",
    `${CHANNEL}/${tab}`,
  )
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [id, ...title] = line.split("\t");
      return { id, title: title.join("\t") };
    });
}

/** "The Lion and the Mouse 🦁🐭 | A Hindi Story" → "The Lion and the Mouse" */
const stripTitle = (s) =>
  s
    .split(" | ")[0]
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();

const key = (title) =>
  stripTitle(title)
    .toLowerCase()
    .replace(/[^a-z]/g, "");
const slug = (title) =>
  stripTitle(title)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Splits "हिंदी / English", "हिंदी · English" or "हिंदी | English" into its two languages. */
function bilingual(text) {
  const parts = text.split(/\s+[/·|]\s+/);
  return {
    hi: parts.filter((p) => DEVANAGARI.test(p)).join(" "),
    en: parts.filter((p) => !DEVANAGARI.test(p)).join(" "),
  };
}

const capitalise = (s) => s && s[0].toUpperCase() + s.slice(1);

function draft(video, englishTitle, short) {
  // The descriptions are bilingual but not laid out alike: the two languages
  // come as separate paragraphs, alternating lines, or both on one line. So
  // this works line by line and sorts lines by script.
  const lines = video.description.split("\n").map((l) => l.trim());
  const isHi = (s) => DEVANAGARI.test(s);
  const MORAL = /^(?:(?:सीख|शिक्षा)(?:\s*\/\s*Moral)?|Moral)\s*:\s*/i;
  const isOther = (l) =>
    !l || l.startsWith("#") || TIMESTAMP.test(l) || MORAL.test(l);
  // Skips one-line notes like "Hindi with English subtitles (CC)."
  const isProse = (l) => l.length >= 80 && !isOther(l);

  // "शिक्षा / Moral: <Hindi>। <English>" on one line, or a moral line followed
  // by its translation on the next.
  const moralSentences = [];
  lines.forEach((line, i) => {
    if (!MORAL.test(line)) return;
    const text = line.replace(MORAL, "");
    moralSentences.push(...text.split(/(?<=[।.!?])\s+/));
    const next = lines[i + 1];
    const mixed = isHi(text) && /[A-Za-z]/.test(text);
    if (next && !isOther(next) && !mixed && isHi(next) !== isHi(text))
      moralSentences.push(...next.split(/(?<=[।.!?])\s+/));
  });
  const moralIn = (hindi) =>
    capitalise(moralSentences.filter((s) => isHi(s) === hindi).join(" ")) ||
    undefined;

  // Hindi chapter titles: a timestamp list of their own, or "हिंदी / English"
  // on each line of a single list.
  const hindiLines = lines
    .map((l) => TIMESTAMP.exec(l))
    .filter((m) => m && isHi(m[4]))
    .map((m) => bilingual(m[4].trim()).hi);
  const chapters = (video.chapters ?? []).map((c, i) => {
    const { hi, en } = bilingual(c.title);
    const titleHi =
      hi || (hindiLines.length === video.chapters.length ? hindiLines[i] : "");
    return {
      start: Math.round(c.start_time),
      title: en || c.title,
      ...(titleHi && { titleHi }),
    };
  });

  const id = slug(englishTitle);
  const story = {
    title: stripTitle(englishTitle),
    titleHi: stripTitle(video.title),
    collection: COLLECTIONS.find(([, re]) =>
      re.test(`${video.title} ${englishTitle}`),
    )?.[0],
    youtube: video.id,
    short,
    published: `${video.upload_date.slice(0, 4)}-${video.upload_date.slice(4, 6)}-${video.upload_date.slice(6)}`,
    duration: video.duration,
    summary: lines.find((l) => isProse(l) && !isHi(l)),
    summaryHi: lines.find((l) => isProse(l) && isHi(l)),
    moral: moralIn(false),
    moralHi: moralIn(true),
    chapters,
    cover: `../../assets/stories/${id}.jpg`,
  };
  const missing = Object.entries(story)
    .filter(([k, v]) => v === undefined && k !== "short")
    .map(([k]) => k);
  return { id, story, missing };
}

async function main() {
  const files = readdirSync(STORIES).filter((f) => f.endsWith(".json"));
  const stories = files.map((f) => ({
    file: path.join(STORIES, f),
    data: JSON.parse(readFileSync(path.join(STORIES, f), "utf8")),
  }));
  const known = new Set(stories.map((s) => s.data.youtube));

  const films = list("videos");
  const shorts = list("shorts");
  const shortFor = (title) =>
    shorts.find((s) => key(s.title) === key(title))?.id;
  const report = [];

  for (const { file, data } of stories) {
    const film = films.find((f) => f.id === data.youtube);
    const short = film && !data.short && shortFor(film.title);
    if (short) {
      data.short = short;
      writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
      report.push(`${file}: added the reel ${short}`);
    }
  }

  for (const film of films.filter((f) => !known.has(f.id))) {
    const video = JSON.parse(
      ytdlp(
        "--skip-download",
        "--dump-json",
        `https://www.youtube.com/watch?v=${film.id}`,
      ),
    );
    const { id, story, missing } = draft(
      video,
      film.title,
      shortFor(film.title),
    );
    const file = path.join(STORIES, `${id}.json`);
    if (existsSync(file)) {
      report.push(
        `${file} already exists for another video; skipped ${film.id}`,
      );
      continue;
    }
    const cover = await fetch(
      `https://i.ytimg.com/vi/${film.id}/maxresdefault.jpg`,
    );
    if (!cover.ok)
      throw new Error(`cover for ${film.id}: HTTP ${cover.status}`);
    await writeFile(
      path.join(COVERS, `${id}.jpg`),
      Buffer.from(await cover.arrayBuffer()),
    );
    writeFileSync(file, JSON.stringify(story, null, 2) + "\n");
    report.push(
      `${file}: new` +
        (missing.length ? `; fill in by hand: ${missing.join(", ")}` : ""),
    );
  }

  console.log(
    report.length ? report.join("\n") : "Up to date with the channel.",
  );
}

await main();
