---
title: "Cycle-Accurate Game Boy Emulator"
date: 2026-07-01
status: "complete"
role: "everything — core, PPU, APU, debugger"
tools: ["C++", "SDL2"]
summary: "An emulator for the original Game Boy, stepped one T-cycle at a time — 34/34 Blargg tests, pixel-perfect dmg-acid2, and 91 of 93 Mooneye hardware-accuracy tests."
repo: "https://github.com/shahirAhmed06/gb-emulator"
media:
  - type: video
    src: "/images/projects/gb-emulator/hero.mp4"
    poster: "/images/projects/gb-emulator/hero-poster.jpg"
    alt: "Live gameplay on the emulator"
    caption: "Live gameplay on the emulator"
  - type: image
    src: "/images/projects/gb-emulator/2.png"
    alt: ""
  - type: image
    src: "/images/projects/gb-emulator/3.png"
    alt: ""
---

An emulator for the original Game Boy, built to answer a question I kept
running into in embedded work: what does it actually take to reproduce a
piece of hardware exactly, not approximately? The answer turned out to be
timing. Everything in a Game Boy — CPU, pixel pipeline, timers, audio, DMA —
moves in lockstep at 4 MHz, and games (and especially test ROMs) can observe
disagreements of a single cycle.

So the emulator is T-cycle-stepped: the CPU drives time, every memory access
advances every other component by exactly four cycles, and the PPU renders
one dot per cycle through a pixel FIFO with the real fetcher behavior —
sprite tile-hold penalties, the SCX discard, the window line counter, the
LY=153 quirk. The oddities are the point: the HALT bug, the EI delay slot,
OAM DMA bus conflicts, the timer's falling-edge multiplexer and TIMA reload
windows are all modeled, because the test suites check every one.

Validation is the part I'd show first. A headless harness runs the standard
suites with automated pass/fail detection: all 34 Blargg CPU, timing, and
sound tests pass; the dmg-acid2 rendering test matches the reference image
with zero of 23,040 pixels differing; and 91 of 93 applicable tests in the
Mooneye hardware-accuracy suite pass. The two failures are documented in the
README with root causes — both come down to sub-cycle orderings my
architecture intentionally quantizes, and I can say precisely which ordering
each one needs.

Beyond the core: five cartridge mappers (including MBC3 with real-time
clock), battery saves, the four-channel APU with its trigger and power
quirks, an SDL2 frontend that plays games at full speed with turbo, and a
built-in debugger — pause, single-step, disassembly, and a live VRAM tile
viewer. The core has no SDL dependency, so the same code runs headless in
the test harness and interactively in the frontend.
