---
title: "Active Noise Cancellation Engine"
date: 2026-06-11
status: "complete"
role: "everything — firmware, test bench, audio bridge"
tools: ["C", "Python"]
summary: "A fixed-point Filtered-x LMS noise-cancellation engine in C — −34 dB at the 50 ms deadline, certified by a bit-reproducible test bench that drives the real compiled firmware."
repo: "https://github.com/shahirAhmed06/anc-engine"
media:
  - type: image
    src: "/images/projects/anc-engine/hero.png"
    alt: ""
  - type: video
    src: "/images/projects/anc-engine/2.mp4"
    alt: "anc at work: dB spike when noise is introduced which is suppressed by the engine"
    caption: "anc at work: dB spike when noise is introduced which is suppressed by the engine"
  - type: image
    src: "/images/projects/anc-engine/3.png"
    alt: ""
---

An adaptive noise-cancellation engine of the kind that ships on earbuds and
aircraft cabin systems, written in C.

The algorithm is Filtered-x LMS: a reference microphone hears the noise
early, a 32-tap adaptive filter drives a cancellation speaker, and an error
microphone's residual continuously re-tunes the filter. Convergence was
deadline-limited by the source's weak harmonics, fixed with a decorrelating
first-difference on the update path. A fixed step size diverged when the
source got 8 dB louder, fixed with a division-free normalizer that halves
the step per doubling of input power. The best bug: a truncating right-shift
biased every weight update by half an LSB, which integrated into a −17.5 dB
performance floor — rounding the shift moved the floor to −38 dB. One line,
21 dB.

Certified numbers, all from a deterministic, bit-reproducible test bench
that drives the real compiled firmware sample-by-sample through its 16-bit
interface: −34.0 dB noise reduction at the 50 ms deadline, a −41 dB
steady-state floor, an 8-case robustness sweep plus fault-injection tests
all passing, and a 60 s endurance run with zero watchdog trips. A two-tier
watchdog distinguishes real divergence from external bangs by checking
whether the engine's own output dominates the error power.

There's also a live bridge: laptop mic through the actual compiled engine to
headphones at 44.1 kHz.
