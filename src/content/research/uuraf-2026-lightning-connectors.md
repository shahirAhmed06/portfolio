---
title: "UURAF 2026 — Scanning Electron Microscopy Research"
date: 2026-04-10
type: "conference"
summary: "SEM and EDS comparison of the probe contacts in a genuine Apple Lightning connector and a cheap third-party one. Second-place award at UURAF 2026."
award: "Second place — UURAF 2026"
media:
  - type: image
    src: "/images/research/uuraf-2026-lightning-connectors/hero.png"
    alt: ""
  - type: image
    src: "/images/research/uuraf-2026-lightning-connectors/2.png"
    alt: ""
  - type: image
    src: "/images/research/uuraf-2026-lightning-connectors/3.jpeg"
    alt: ""
---

## 00.01 — The question

A genuine Apple Lightning cable costs several times what a third-party one does. Both plug into the same port, both charge the same phone, and under any reasonable inspection they are indistinguishable. So: is the price difference real engineering, or is it branding?

That is an answerable question, and the place to answer it is the **probe contacts** — the eight small metal pins that carry every electron between the cable and the device. They are the entire electrical interface, and they have to survive thousands of insertion cycles without corroding, wearing through, or losing contact. If a manufacturer is going to spend money anywhere, it should be there.

I presented this work at **UURAF 2026**, where it received a **second-place award**.

---

## 00.02 — Method

I obtained one authentic Apple Lightning connector and one cheap third-party connector, disassembled both to expose the eight probe contacts, and characterized them two ways:

- **Scanning electron microscopy (SEM)** at 1500× with a secondary electron detector, to compare surface microstructure.
- **Energy-dispersive X-ray spectroscopy (EDS)**, to identify what the probes are actually made of.

The pairing matters. SEM tells you what the surface *looks* like; EDS tells you what it *is*. A question about manufacturing quality could be answered by either — and in this case, they gave different answers, which turned out to be the interesting part.

---

## 00.03 — Results

**Under SEM, the two are essentially the same.** At 1500×, the probe surfaces from both connectors showed comparable morphology, with no notable visual differences. If you only ran the imaging, you would conclude the connectors were equivalent and stop.

**Under EDS, they are not the same at all.**

| | Cheap third-party | Apple |
|---|---|---|
| Elements detected | C, O, **Ni**, **Cu** | C, **Ni**, **Pt** |
| Dominant metal | Nickel (~83 wt%) | **Platinum (~67–70 wt%)** |
| Also present | Copper (~3–4 wt%), Oxygen | Nickel (~5–6 wt%) |

The headline finding: **platinum**, present on the Apple probes and entirely absent from the cheap ones. Running the other way, the cheap probes contained copper and oxygen that the Apple probes did not.

---

## 00.04 — What it means

The elemental signatures point to two different design decisions.

The cheap connector reads as a **nickel alloy probe with a thin copper plating** — copper for conductivity and basic corrosion resistance, and the detected oxygen plausibly indicating surface oxidation of the underlying substrate. Which is exactly the failure mode you would worry about: an oxidizing contact surface is a contact resistance that grows over time.

The Apple connector reads as a **platinum coating over a nickel layer**, with no copper and no oxygen detected. Platinum is a defensible choice here rather than a decorative one — it is highly corrosion-resistant, an excellent conductor, and holds up to repeated mechanical contact. It is also, obviously, expensive.

The most useful conclusion is the one that emerged from the *disagreement* between the two techniques: **the microstructure is comparable, so the differentiator is material selection, not manufacturing process.** Both connectors are made about as well as each other. One of them is just made of better stuff.

---

*With thanks to Dr. Per Askeland and Dr. Carl Boehlert for their guidance throughout this project.*
