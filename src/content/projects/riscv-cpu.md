---
title: "A RISC-V Computer From Scratch"
date: 2026-07-09
status: "in-progress"
role: "everything — RTL, SoC, toolchain, runtime"
tools: ["Verilog", "Icarus Verilog", "Yosys", "nextpnr", "riscv-none-elf-gcc"]
summary: "A complete RV32I CPU and SoC in ~700 lines of Verilog — passes all 41 official RISC-V instruction tests and runs C compiled with stock GCC."
repo: "https://github.com/shahirAhmed06/riscv-cpu-tang-nano"
media:
  - type: image
    src: "/images/projects/riscv-cpu/hero.gif"
    alt: ""
  - type: image
    src: "/images/projects/riscv-cpu/2.png"
    alt: ""
  - type: image
    src: "/images/projects/riscv-cpu/3.png"
    alt: ""
---

I wanted to know what actually happens when a C program runs — not the
block-diagram version, the real one. So I built the computer: a complete
RV32I CPU and system-on-chip in Verilog, targeting the Tang Nano 9K FPGA.

The core is deliberately simple — multi-cycle, three to five clocks per
instruction, no pipeline — because the goal was understanding, not IPC.
It implements every RV32I instruction and traps cleanly on illegal opcodes
and misaligned access. Around it sits a small SoC: 32 KB of block RAM, a
115200-baud UART, GPIO for the board's LEDs and buttons, and a 64-bit cycle
counter, all glued together with a memory-mapped bus. The whole design is
about 700 lines of Verilog, and it passes all 41 tests in the official
RISC-V rv32ui suite.

The part I underestimated was the software half. Making the hardware execute
instructions was maybe 60% of the work; making it run *C* meant writing the
linker script that decides where code and data live, the startup assembly
that zeroes .bss and sets the stack pointer, and a minimal runtime with a
printf that talks to the UART. The payoff is that stock gcc — no patches, no
special flags beyond the arch — compiles a program that computes primes and
prints them from a CPU I can read every line of.

The build flow is fully open-source: Icarus Verilog for simulation, Yosys
for synthesis, nextpnr for place-and-route. The design uses 3,500 LUTs (41%
of the chip) and closes timing at the 27 MHz system clock with margin to
spare.

Next on the bench: bring-up on the physical board, then the v2 list — RV32M
multiply/divide, interrupts, and a UART bootloader so I can load programs
without rebuilding the bitstream.
