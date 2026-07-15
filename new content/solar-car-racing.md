---
title: "MSU Solar Car Racing"
slug: "solar-car-racing"
organization: "MSU Solar Car Racing"
role: "Vehicle Controls and Sensing"
location: "East Lansing, MI"
startDate: 2025-09-01
endDate: null
current: true
summary: "Designing, assembling, and debugging the boards and firmware that let the car's systems talk to each other — from 4-layer Altium layout to STM32 CAN firmware running on the vehicle."
heroImage: ""
---

## 00.01 — Context

I have been on **MSU Solar Car Racing** since September 2025, working on **Vehicle Controls and Sensing**. The car is MSU's official entry for the **2026 Formula Sun Grand Prix** and the **American Solar Challenge** — a real vehicle with a real deadline, which is most of the appeal.


Controls and Sensing owns two of those: the **lighting board** and the **Vehicle Control PCB**, the board that talks to every other board and to the car's mechanical systems. It is, functionally, the brain of the car.

---

## 00.02 — Hardware design

I take boards from schematic through to fabrication in **Altium Designer** — schematic capture, part selection, and 4-layer impedance-controlled layout for safety-critical vehicle control systems.

Part selection on a car is not the same exercise as part selection on a bench project. Every component gets validated against automotive operating conditions — temperature range, thermal dissipation, transient behavior on a noisy supply — and, unglamorously but unavoidably, against **supply chain availability**. A part that is perfect and unobtainable is not perfect. That applies across the board: MCUs, sensors, MOSFETs, regulators.

I also assemble them. That means **hand-soldering fine-pitch components** to IPC standards, which has a much steeper learning curve than it looks like from the outside and is a skill I would rather have than not.

---

## 00.03 — Firmware

I wrote the **STM32 firmware in C++ for the lighting board** — the same board I laid out, though the layout and the firmware were separate pieces of work. It is now **installed and tested on the vehicle**.

Lighting sounds trivial until you look at what it depends on. The board knows nothing on its own; it learns everything over **CAN**. I configured reception for five message types — turn signals, hazards, brake, and BPS fault and implemented the full lighting logic on top of them.

The BPS fault case is the one that matters. A battery protection system fault is the car reporting that something is wrong at the pack level, and the lighting board's job is to make that visible immediately and unambiguously. The logic has to be correct not in the average case but in the failure case, which is a different design posture than most firmware I have written.

Working on this also forced me to actually understand CAN: arbitration, message IDs functioning as priorities, and why a broadcast bus with no addressing is the right choice for a vehicle in the first place.

---

## 00.04 — Debugging

The most instructive work has been bring-up on boards that should have worked and did not.

The clearest case: an inherited board with critical malfunctions caused by **traces routed underneath ICs**. It is the kind of fault that is invisible in the schematic, survives any review that only checks the netlist, and only surfaces when a populated board misbehaves in a way that makes no logical sense. Finding it meant abandoning the assumption that the design was right and measuring my way back to physical reality with a multimeter.

---

## 00.05 — Why this team

Solar car is the closest thing an undergraduate gets to shipping a vehicle. There is a hard date on the calendar, the car either drives or it does not, and every board I design has to survive being physically installed in something that then goes out and races. It is the least abstract engineering I do, and the feedback loop is brutal in the best way.
