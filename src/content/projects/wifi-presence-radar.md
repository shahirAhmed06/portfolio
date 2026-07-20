---
title: "Motion Detection Over WiFi"
date: 2026-07-05
role: "everything — firmware, host detector"
tools: ["ESP32", "C", "Python"]
summary: "Motion detection with no motion sensor: an ESP32 reads WiFi Channel State Information — how a room's multipath distorts each subcarrier — and flags people moving through it."
repo: "https://github.com/shahirAhmed06/wifi-presence-radar"
media:
  - type: image
    src: "/images/projects/wifi-presence-radar/hero.png"
    alt: ""
  - type: image
    src: "/images/projects/wifi-presence-radar/2.jpeg"
    alt: "The setup: just an ESP32 connected to WiFi"
    caption: "The setup: just an ESP32 connected to WiFi"
  - type: video
    src: "/images/projects/wifi-presence-radar/3.mp4"
    alt: 'Goes from "Quiet" to "Motion" every time I move'
    caption: 'Goes from "Quiet" to "Motion" every time I move'
---

Motion detection with no motion sensor. A WiFi signal arriving at a receiver
is the sum of many paths — direct, off the walls, off the furniture, off
people — and the radio already measures how that multipath distorts each
OFDM subcarrier, because it must equalize them to decode anything. That
measurement is Channel State Information, and the ESP32 exposes it. A person
walking through the room changes the paths, the per-subcarrier amplitudes
ripple, and software can see it.

The firmware side is small by design: the ESP32 joins my network, pings the
router 20 times a second to guarantee steady traffic, captures CSI from
every reply (filtered to the router's MAC), and streams each frame over USB
serial as a CSV line. The interesting constraints are operational — WiFi
power save has to be disabled because it gaps the capture, and the CSI
callback runs inside the WiFi task, so frames cross to the output loop
through a FreeRTOS queue rather than doing serial I/O in the callback.

The host side does the actual sensing: a Python viewer plots a live
waterfall of subcarrier amplitudes next to a motion metric — the mean
per-subcarrier standard deviation over a two-second sliding window —
against an adaptive threshold that learns the room's quiet level slowly and
falls back quickly, with hysteresis so the presence flag doesn't flicker.
In synthetic-data tests the detector flags motion within about half a
second of onset and recovers even when it starts up mid-motion.

It works in simulation, but it is not as accurate as it should be in
reality. Fine-tuning the parameters is the current work.
