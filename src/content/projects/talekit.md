---
title: talekit
tagline: Story video generation for AI agents. An MCP server and engine that turn agent-written SVG and JSON into animated films with rigged characters, speech bubbles and voices.
tier: featured
order: 2
page: true
accent: "#7a4cc2"
year: 2026
platforms: [macOS, CLI, MCP]
stack: [TypeScript, MCP, resvg, ffmpeg, HarfBuzz, MLX]
repo: https://github.com/vivekg7/talekit
links:
  - label: Kahani ki Potli on YouTube
    url: https://www.youtube.com/@KahaniKiPotli7
facts:
  - value: "21"
    label: MCP tools
  - value: "~10 s"
    label: to render a minute of 720p
  - value: "3"
    label: puppet rigs
  - value: Hindi + English
    label: voices and subtitles
cover:
  src: ../../assets/projects/talekit/showcase.jpg
  alt: The covers of the first nine Kahani ki Potli films, each drawn by talekit from one frame of its film
---

Give an AI agent a children's story and point it at talekit. The agent
designs the characters and scenes, writes a shot-by-shot timeline, checks its
own work from rendered previews, and produces an mp4 of simple 2D animation
with comic-style speech bubbles and spoken lines.

## Made with it

[**Kahani ki Potli**](https://www.youtube.com/@KahaniKiPotli7) is a channel
of Hindi stories for children made entirely with talekit: Panchatantra fables,
Tenali Rama and other classic tales. Each story goes out as a full film and
as a portrait reel of around three minutes, with Hindi and English subtitles.

## The idea: "Paper for video"

The agent writes in a language it's already fluent in, SVG fragments and
JSON. The engine owns everything that's hard to get right by hand: rigging,
walks with planted feet, follow-through, faces, bubble layout, camera,
weather, sound and encoding.

```
story ──agent──▶ characters/*.json  scenes/*.json  shots/*.json ──talekit──▶ movie.mp4
                 (rigged SVG puppets) (SVG + anchors)  (timeline)
```

The design rests on a few principles:

- **The agent never animates a limb.** It writes _what happens when_. Walk
  cycles, blinks, mouth flaps, easing and camera moves are engine code.
  Motion written by an agent looks wrong nearly every time, so the engine is
  where the quality lives.
- **Constrain the drawing.** Characters are drawn into a fixed box with known
  pivot points: a humanoid, a quadruped or a simple rig. The agent fills in
  the shapes, and the engine already knows where the shoulders and hips are.
  That constraint is what makes an LLM-drawn character animate reliably.
- **Every write returns a picture.** `write_character` returns a pose sheet,
  `write_scene` the scene with its anchors marked, `write_shot` a contact
  sheet. Without that feedback loop, output quality collapses.
- **Plain files on disk.** A project is a directory of JSON files, so it
  works with any editor or agent and diffs cleanly in git. The MCP server is a
  thin layer over the same library the CLI uses.
- **Deterministic rendering.** A frame is a pure function
  `(project, shot, t) → SVG`. Previews, tests and the final video always
  agree.

## How it renders

The engine is pure TypeScript with no I/O. Frames are rasterised with resvg
on worker threads and streamed as raw pixels into ffmpeg, while the sound is
mixed in JavaScript from a cue sheet. A minute of 720p takes about ten
seconds on an M-series Mac. Spoken lines come from a local text-to-speech
model running on MLX. They're cached in the project, so a render comes out
the same every time.

Hindi is shaped with HarfBuzz in a bundled Devanagari font, because the
rasteriser alone misplaces the vowel signs. Beside the mp4, each film also
comes out as an `.mkv` with three sound tracks, subtitles in every language
and a chapter per shot.

## Reviewing a film

`talekit serve` opens a review app for each film. You pick a moment, click
the spot that's wrong and type a note. The agent then reads each note
together with a picture of what you saw, fixes it and marks it resolved.
Fixes appear in the app as the agent works. A film and its reel can be
reviewed side by side, and a reel can be checked on a phone over the local
network, with the areas the Shorts and Reels apps cover shaded.
