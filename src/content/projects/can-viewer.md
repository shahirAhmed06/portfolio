---
title: "CAN Viewer"
date: 2026-10-10
role: "everything — schematic, layout, firmware"
tools: ["Altium Designer", "STM32C552KET6"]
summary: "An RJ45 CAN interface for MSU Solar Car Racing, based on the MKS CANable V2.0 Pro."
mediaLayout: wide
media:
  - type: image
    src: "/images/projects/can-viewer/hero.png"
    alt: ""
---

This is the latest PCB project I am making for MSU Solar Car Racing Team. When we went to race the car in FSGP 2026, we constantly needed to validate whether our boards can send and receive CAN messages, and we did so using the MKS CANable V2.0 Pro. However it was very unreliable in such a high-octane situation because the wires needed to be connected using a screw terminal, and it kept ripping apart due to the heavy weight of the RJ45 cables. Even when it did work, it had severe connectivity issues. So I decided to make my own one.

I based my design off of the MKS CANable V2.0 Pro and added some necessary upgrades. For starters, I replaced the screw terminal with an RJ45 female connector for easier connectivity. However, the upgrade I am most proud of is replacing the microcontroller. The old design uses an STM32G series microcontroller, which is way overkill for this project and makes the board more expensive for no reason. I replaced it with an STM32C552KET6, a lightweight MCU perfect for this task. This is also the part of the project that was the most challenging, as it is a very new microcontroller and there is very little documentation on how to set up the peripherals. I managed to successfully set it up by painfully combing through the datasheet, and some STM32H peripherals that I could find. This project took me upwards of 20 hours, however with the knowledge I gained through this project, I could probably get a similar one done in 5. Next Steps: Getting the PCB Layout done(hopefully within the next two weeks), ordering it, assembling it, and the part I am most excited for: writing the firmware for it.
