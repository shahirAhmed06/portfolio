---
title: "Automated Satellite Ground Station"
date: 2026-07-09
status: "in-progress"
role: "everything — prediction, scheduling, capture pipeline"
tools: ["Python", "Skyfield", "RTL-SDR", "SatDump"]
summary: "A ground station that predicts Meteor-M weather-satellite passes and autonomously captures their 137.9 MHz imagery downlink — pictures of Earth, received in the yard."
repo: "https://github.com/shahirAhmed06/groundstation"
media:
  - type: image
    src: "/images/projects/satellite-groundstation/hero.png"
    alt: "The complete workflow"
    caption: "The complete workflow"
  - type: image
    src: "/images/projects/satellite-groundstation/2.png"
    alt: "Predictions for the station"
    caption: "Predictions for the station"
  - type: image
    src: "/images/projects/satellite-groundstation/3.png"
    alt: "Satellite track"
    caption: "Satellite track"
---

Several times a day, a Russian weather satellite flies over East Lansing
broadcasting pictures of Earth it took minutes earlier, at 137.9 MHz, to
anyone with an antenna. I'm building the anyone.

The classic way into this hobby, NOAA's analog APT satellites, closed in
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
