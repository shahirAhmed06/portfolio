summary: "A tested Python package, GUI, and CLI for analyzing potentiostat voltammetry data — CV, DPV, FS-CV, and Tafel — built to replace the manual macro-plus-Origin workflow I use in lab."
---

In the Microtechnology Lab I run cyclic voltammetry, DPV, and fast-scan CV
on CH Instruments potentiostats, and the analysis workflow is manual:
instrument macros, copy into Origin, pick baselines by eye, repeat. ecvolt
is my attempt to replace that with something version-controlled and tested.

It's a Python package with a GUI and CLI covering four techniques. CV:
peak detection with proper baseline correction, ΔEp and peak-ratio
diagnostics, and Randles–Sevcik fits across a scan-rate series to extract
diffusion coefficients. DPV: peak finding, FWHM, two-Gaussian deconvolution
for overlapping peaks, and calibration curves with ICH-standard LOD/LOQ.
FS-CV: background subtraction, color plots, current-vs-time extraction.
Tafel: slope and exchange-current fits in a user-chosen window. The GUI
(PySide6) lets you pick baseline anchors and Tafel windows by dragging
directly on the curve, but contains zero analysis math — every number comes
from a library function, so the same code path is unit-tested headlessly.

The part I care most about is verification. The test suite runs entirely on
synthetic data with known answers: the Randles–Sevcik fit recovers a known
diffusion coefficient within 5% from deliberately noisy files (exactly from
clean ones), Tafel slope and exchange current come back within 2% and 10%,
and the demo command reruns byte-identically. Parsing handles the messy
reality of instrument exports — unit scaling from column labels,
multi-segment scans, deliberately malformed files in the tests.

The next step is validating the parser against my own lab exports and cross-checking results against the existing Origin workflow before trusting it for anything that matters. I have already done some tests on Cyclic Voltametry results as shown in images, but there's more improvements to be done before it can replace the tools I use.
```