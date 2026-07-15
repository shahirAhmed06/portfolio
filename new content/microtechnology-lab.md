---
title: "Heavy Metal Ion Sensing in the Microtechnology Lab"
slug: "microtechnology-lab"
date: 2025-09-01
type: "Lab work"
summary: "Electrochemical detection of heavy metal ions, and the development of a low-cost microfluidic potentiostat for continuous sensing down to 10 ppb."
heroImage: ""
---

## 00.01 — Context

I have been an undergraduate researcher in Dr. Wen Li's Microtechnology Lab at Michigan State University since September 2025. The lab's work sits at the intersection of microfabrication, sensing, and instrumentation. My piece of it is electrochemical detection of heavy metal ions — lead, cadmium, and related contaminants — and the hardware that makes that detection cheap, continuous, and portable.

Heavy metal contamination in water is a measurement problem before it is a policy problem. The reference methods are accurate but centralized: samples get collected, shipped, and run on benchtop instruments costing tens of thousands of dollars. The result is sparse, delayed data. The question I work on is whether a sufficiently good analog front-end, a microcontroller, and a microfluidic channel can push that same measurement into a device that costs orders of magnitude less and runs unattended.

---

## 00.02 — Electrochemical characterization

The bulk of my bench work is voltammetry. I have run over 1,000 electrochemical experiments across three techniques:

- **Cyclic Voltammetry (CV)** — sweeping potential across a window and recording the current response, used to characterize electrode behavior and identify the redox peaks associated with target ions.
- **Differential Pulse Voltammetry (DPV)** — superimposing pulses on a staircase ramp to suppress capacitive background current, which is what actually buys the sensitivity needed at trace concentrations.
- **Fast-Scan Cyclic Voltammetry (FSCV)** — CV at high scan rates, where the timing and current-sampling requirements on the instrument get considerably harsher.

These run on carbon fiber and Boron-Doped Diamond (BDD) working electrodes. BDD is the interesting one: a wide potential window, low background current, and resistance to fouling make it well-suited to trace metal detection, but it behaves differently enough from carbon fiber that a lot of the work is understanding *how* differently.

The output of all this is data — a lot of it. I have analyzed 100+ experimental datasets in **Origin**, **MATLAB**, and the lab's internal electrochemical analyzer which I am currently working on, producing the plots we use to benchmark electrode performance against each other and to validate whether the system is actually hitting the sensitivity thresholds we claim it is.

---

## 00.03 — The microfluidic potentiostat

The instrument side of the project is a low-cost microfluidic potentiostat platform for **continuous, automatic heavy metal sensing down to 10 ppb**. Rather than a technician pipetting a sample into a cell, the target is a device that pulls solution through a channel, runs a measurement, and reports a concentration — repeatedly, without intervention.

It is built around a custom **analog front-end** — the potentiostat proper, responsible for holding the working electrode at a commanded potential and converting the resulting faradaic current into a voltage the ADC can read — with a **Teensy microcontroller** handling control and acquisition.

This is where the project stops being chemistry and starts being a hardware problem. At 10 ppb, the currents involved are small, and everything that is easy to ignore in a benchtop instrument — noise on the transimpedance stage, settling time, ADC resolution, ground routing — becomes the thing that determines whether the measurement exists at all.

### Firmware

I developed the complete **Teensy 4.1 firmware stack for cyclic voltammetry**, covering:

- **Voltage sweep generation** — producing the potential ramp applied to the electrode, with the step size and scan rate the experiment calls for.
- **Current sampling** — reading the front-end output at the right instant relative to the applied potential.
- **Timing control** — the piece that makes the other two mean anything. A CV curve is only valid if the sampling is deterministically aligned to the sweep; jitter shows up directly as distortion in the trace.

The firmware acquires accurate CV curves at milliamp-level current sensitivity.

### PCB debug

I debugged a **4-channel potentiostat PCB** that arrived non-functional across half its channels. Working through it systematically, I identified and resolved **six distinct layout and assembly faults**, doubling the number of working channels on the board.

Board bring-up is a genuinely different skill from board design, and this was the clearest lesson I have had in it: the failure is almost never where the symptom is, and the discipline is in isolating stages rather than guessing.

### Microfluidics

I designed and laser-cut a **Tesla-valve microfluidic channel in AutoCAD** for directional solution routing to the electrode sites on the 4-channel platform. The Tesla valve is a nice piece of engineering — a passive, no-moving-parts geometry that presents a much higher flow resistance in one direction than the other, which means directional control without a valve to actuate, fail, or contaminate the sample.

---

## 00.04 — Where it is going

The platform is close to done. We are now wrapping up our final tests with it for a journal paper submission. After that, we shift our focus into the multichannel potentiostat, and running several tests at once.


