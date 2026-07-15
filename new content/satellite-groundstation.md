---
title: "Automated Satellite Ground Station"
slug: "satellite-groundstation"
date: 2026-07-09
status: "in progress"
role: "everything — prediction, scheduling, capture pipeline"
tools: ["Python", "Skyfield", "RTL-SDR", "SatDump"]
tags: ["sdr", "rf", "satellites", "orbital-mechanics", "personal-project"]
summary: "A ground station that predicts Meteor-M weather-satellite passes and autonomously captures their 137.9 MHz imagery downlink — pictures of Earth, received in the yard."
hero:
  src: "./groundstation.jpg"
  alt: "Terminal output of the station predicting upcoming Meteor-M passes"
---

Several times a day, a Russian weather satellite flies over East Lansing
broadcasting pictures of Earth it took minutes earlier, at 137.9 MHz, to
anyone with an antenna. I'm building the anyone.

The classic way into this hobby, NOAA's analog APT satellites closed in
2025 when the last of them was decommissioned. What's left is harder and
more interesting: the Meteor-M satellites transmit LRPT, a digital QPSK
downlink at 72k symbols per second that needs real demodulation, Viterbi
decoding, and Reed-Solomon error correction before it becomes an image.

The station is a Python package that automates the whole receive chain.
It pulls fresh orbital elements from Celestrak daily, predicts every usable
pass with Skyfield — when the satellite rises, how high it gets, which
direction to expect it — and I've verified those predictions against live
satellite data. A scheduler daemon sleeps until the next acquisition of
signal, then drives SatDump through the capture and decode, filing decoded
imagery and logs per-pass, with a raw-IQ fallback recording if the live
decode dies mid-pass. A `doctor` command checks tools, hardware, and config
so a 3 a.m. pass doesn't fail for a dumb reason.

That last point turned out to be the actual engineering problem. Orbital
mechanics is a solved library call; the real work is building something
that runs unattended — passes happen when they happen, and there's no
retrying a satellite.

Next milestone is first light: an RTL-SDR and a 137 MHz dipole on the bench,
then the first decoded image. After that, the stretch goal is replacing
SatDump's demodulator with my own QPSK receiver in GNU Radio — the receive
chain is the part I most want to own end-to-end.

<!-- ═══════════════════════════════════════════════════════════════════
DEMO MEDIA TO CAPTURE (delete this comment before publishing)

Available right now (no hardware needed):
1. IMAGE (interim hero): terminal shot of `python -m station predict` —
   the table of upcoming passes with times/elevations. Pair with
   `station next` output.
2. IMAGE: `station doctor` readiness report — shows the ops mindset.
3. IMAGE: a clean architecture diagram of the pipeline (TLE → predict →
   scheduler → SatDump → images). Redraw the README's ASCII art properly.
4. IMAGE: sky-track plot of one predicted pass (azimuth/elevation polar
   plot, matplotlib, ~30 lines) — visually striking and cheap to make.

After first light (hero replacements, in order of impact):
5. IMAGE: the first decoded Meteor-M image of Earth — THE hero, run it
   full-bleed.
6. IMAGE: photo of the antenna build (V-dipole in the yard) — people love
   the "this hardware did that" pairing with #5.
7. VIDEO (~30–60s): time-lapse of a live pass — SatDump constellation
   locking + image lines scrolling in as the satellite flies over.
8. IMAGE: QPSK constellation of the actual received downlink, locked.
═══════════════════════════════════════════════════════════════════ -->
