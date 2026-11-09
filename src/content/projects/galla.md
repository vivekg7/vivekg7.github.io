---
title: Galla
tagline: Bills, stock and UPI QR codes for a kirana shop, on one Android phone, with no internet.
tier: featured
order: 3
page: true
accent: "#2f7a4f"
year: 2026
platforms: [Android]
stack: [Kotlin, Jetpack Compose, Room, CameraX, ML Kit]
status: Closed testing on Google Play
repo: https://github.com/vivekg7/galla
links:
  - label: Google Play (testers)
    url: https://play.google.com/store/apps/details?id=io.github.vivekg7.galla
facts:
  - value: "1"
    label: permission (camera)
  - value: "0"
    label: servers of its own
  - value: EAN-13
    label: barcodes it prints for loose stock
  - value: UPI QR
    label: for each bill's exact total
cover:
  src: ../../assets/projects/galla/feature-graphic.png
  alt: Galla feature graphic
screenshots:
  - src: ../../assets/projects/galla/screenshot-1-upi-qr.png
    alt: A bill's payment slip with a UPI QR code for its exact total
  - src: ../../assets/projects/galla/screenshot-2-bill.png
    alt: Building a bill by scanning items
  - src: ../../assets/projects/galla/screenshot-3-stock.png
    alt: The stock list with low-stock warnings
  - src: ../../assets/projects/galla/screenshot-4-sales.png
    alt: The day's sales
  - src: ../../assets/projects/galla/screenshot-5-offline.png
    alt: Galla works with no internet
---

_Apni Dukan, Apna Galla!_ A _galla_ is the cash box under a shop counter.
This one is an Android app for running a single kirana (grocery) shop.

## Why it exists

The shop's owner had tried an existing shop app. It kept everything in
Firebase behind a phone-number login, so it did nothing without internet. It
also did far more than one shop needs: online orders, credit ledgers,
analytics, payment gateways. What the owner asked for came down to three
things, all working offline:

1. **Inventory**: products, prices, stock and restocking.
2. **Barcodes**: scan the ones on packets, and make them for loose goods that
   have none.
3. **A payment slip for each bill**, with a UPI QR code for the exact amount,
   paid straight to the shop's own UPI ID.

There is no printer at the counter, so a bill is a slip you share on WhatsApp.

## What it does

- **Bills.** Scan or search items, weigh loose ones by grams or by rupees,
  add a discount and charge. The slip's QR code already holds the total, so
  the customer scans it and pays without typing an amount.
- **Stock.** Low-stock warnings, a history of every stock change, and
  restocking by scanning what's on the shelf.
- **Barcodes.** Products without one get an in-store EAN-13. GS1 reserves
  numbers starting with 2 for use inside one shop, so they never clash with
  a manufacturer's code. Labels print as an A4 sheet.
- **Backup** to a single file, restorable on the same phone or a new one.
- **Sync between phones** (optional), through the shop's own Google Drive.
  Each phone keeps selling offline and catches up when it's online again.

## Decisions worth explaining

**Offline is enforced, not just intended.** The merged manifest strips
`INTERNET` and `ACCESS_NETWORK_STATE`, which ML Kit's logging libraries
request, so Android itself stops the app from reaching the network. The only
permission left is the camera. Turning on Drive sync is the one deliberate
exception, and the app goes online for that and nothing else.

**The bundled barcode model, not the smaller one.** ML Kit's Play-services
variant is lighter, but it downloads its model on first use, which needs
internet. The bundled model scans on day one in a shop with no signal.

**Native Kotlin and Compose, and very little else.** One activity, no
dependency-injection framework and no navigation library: a list is the back
stack. The app is Android-only, so a cross-platform engine would add nothing.

**The catalogue is the shop's own.** The other app shipped a list of 17,499
barcodes, which was its data and patchy for Indian products anyway. In Galla
the catalogue builds up as the shop scans its shelves.

The full reasoning is in the repo's
[design plans](https://github.com/vivekg7/galla/tree/main/docs/plans).
