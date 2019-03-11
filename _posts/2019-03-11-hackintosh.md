---
layout: post
title:  "Building a Hackintosh"
author: "onze"
date: 2019-03-11 10:57:00 +0100
categories: macOS hackintosh
---
Some weeks ago, I the chance to order a new desktop machine in the office.
Since I'm working with macOS for some years now and I already developed a good workflow, I decided to try to install macOS on it.

I read up on some guides and finally decided to order the parts which are listed on [this](https://www.tonymacx86.com/buyersguide/building-a-customac-hackintosh-the-ultimate-buyers-guide/) website.
This is what I got:

- Fractal Design Define R6 Blackout Midi-Tower
- BitFenix Formula 80 Plus Gold - 650 Watt
- Gigabyte H370 HD3, Intel H370 Mainboard
- Intel Core i7-8700K 3,7 GHz (Coffee Lake) 
- Alpenföhn Brocken 2 PCGH Edition CPU-Kühler - 140 mm
- Crucial Ballistix Sport AT, DDR4-2666, CL16 - 32 GB Dual-Kit 
- Gigabyte GeForce GTX 1070 OC WindForce 2X, 8192 MB GDDR5 
- Samsung 970 EVO NVMe SSD, PCIe 3.0 M.2 Typ 2280 - 500 GB
- Seagate BarraCuda HDD, SATA 6G, 7200 U/min, 3,5 Zoll - 2 TB

I decided to go for an Nvidia graphics card, even though I can't install Mojave on the machine yet, because I would like to be able to run Tensorflow stuff on the machine at some point.

## Installation

At first, I tried to install macOS using [this guide](https://www.tonymacx86.com/threads/unibeast-install-macos-high-sierra-on-any-supported-intel-based-pc.235474/) but without success.
I was able to run the first installation step, but couldn't boot from the new installation afterward to finish installing.

However, using [this guide](https://hackintosher.com/guides/high-sierra-install-full-guide/) I finally managed to install High Sierra, I think the first (unibeast based) guide, was missing some kernel extensions.
After installing, everything except the ethernet connection was working fine.
I was able to get ethernet working by updating some kernel extensions to the latest version.
Besides that, I installed some other kernel extensions to be able to install the Nvidia drivers as described in the guide.
This is a full list the kernel extensions I'm currently using:

- AppleALC.kext
- AtherosE2200Ethernet.kext
- CodecCommander.kext
- FakeSMC.kext
- IntelGraphicsFixup.kext
- IntelMausiEthernet.kext
- Lilu.kext
- RealtekRTL8111.kext
- SmallTreeIntel82576.kext
- USBInjectAll.kext
- WhateverGreen.kext
- XHCI-200-series-injector.kext
- XHCI-300-series-injector.kext
- XHCI-x99-injector.kext

So far, my machine is working great. 
I haven't tried audio yet since I'm using a Bluetooth headset (the Bluetooth dongle was working out of the box).
Airdrop is not working for some reason, but I haven't managed to look into that yet.
