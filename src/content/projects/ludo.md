---
title: Ludo
tagline: Offline Ludo and Snakes & Ladders for Android. Pass the phone between up to four players, with a bot in any seat.
tier: featured
order: 4
page: true
accent: "#d6453d"
year: 2026
platforms: [Android]
stack: [Kotlin, Android Canvas]
repo: https://github.com/vivekg7/ludo
facts:
  - value: 97 KB
    label: signed release APK
  - value: "0"
    label: runtime dependencies
  - value: "0"
    label: permissions requested
  - value: "4"
    label: seats, each human or bot
cover:
  src: ../../assets/projects/ludo/feature-graphic.jpg
  alt: Ludo feature graphic
screenshots:
  - src: ../../assets/projects/ludo/1-ludo.jpg
    alt: A four-player Ludo game in progress
  - src: ../../assets/projects/ludo/2-setup.jpg
    alt: The setup screen, choosing a person or a bot for each seat
  - src: ../../assets/projects/ludo/3-capture.jpg
    alt: A token capturing another
  - src: ../../assets/projects/ludo/4-snakes.jpg
    alt: Snakes and Ladders, the second game
  - src: ../../assets/projects/ludo/5-wins.jpg
    alt: Per-player win counts for each game
  - src: ../../assets/projects/ludo/6-offline.jpg
    alt: No internet, no ads, no permissions
---

A board game you can hand around a room. Up to four people play on one
phone, any seat can be a bot, and each person has a profile that keeps their
wins in each game. Snakes & Ladders comes along as a second game.

## How it gets this small

The signed release APK is 97 KB. There are no runtime dependencies beyond
the Kotlin standard library: no AndroidX, no Compose, no Material.

- **The board and the die are two custom `View`s** drawing on a `Canvas`.
  Tokens, arrows, safe squares and the die's tumble are all drawn in code
  rather than shipped as images.
- **The sound effects are synthesised in code**, so there are no audio files
  to bundle.
- **The setup screen and its dialogs are plain platform widgets.**
- **It requests no permissions and opens no sockets.**

Two packaging choices pull in opposite directions, and both are deliberate.
Setting `minSdk 31` lets the build drop the old v1 JAR signature, which saves
about 3.4 KB. From API 28 the build would normally store `classes.dex`
uncompressed so Android can map it straight from the APK. That's better on
the device but costs 22 KB of download, so the dex is compressed again. The
README notes which way to flip it if startup time ever matters more than
download size.

## Rules that are actually written down

House rules for Ludo vary from family to family, so the game's rules are
spelled out in the README and enforced by a rules engine with plain JVM
unit tests. The same goes for the welcome guide, the setup screen, profiles,
backup, sound and how a game position is stored.

## What's next: a 3D die without a 3D engine

The die spins flat today. The worked-out plan is to make it tumble as a
real cube, still drawn on the same `Canvas`:

- Keep the cube as 8 corners and 6 faces. Each frame, rotate it, project the
  corners with a little perspective, and draw only the faces turned toward
  the viewer. A convex cube never hides part of itself, so nothing needs
  sorting.
- Stretch today's flat face art onto each projected face with
  `Matrix.setPolyToPoly`, and darken each face by its angle to a fixed light.
- Blend rotations with quaternions, so the die doesn't wobble partway through.
- Pick the final orientation before the roll starts, so the die can't land on
  one number and jump to another.

An OpenGL engine would add several megabytes to the APK for one small cube.
This plan is estimated at 200–300 lines and no change in size.
