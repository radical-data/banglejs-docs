---
title: Add Battery and Steps to Your Watchface
description: Show steps, battery, heart rate and more using the clock\_info system.
---

Your custom watchface can do more than just show the time. With the `clock_info` system, you can add swipeable or tap-activated info cards — for battery, heart rate, steps, and more — with just a few lines of code.

This tutorial shows you how.

## 🧠 Prerequisites

- You’ve completed [Build a Custom Watchface](../building-a-watchface)
- Your clock already:

  - Displays time and date
  - Uses `Bangle.setUI("clock")`
  - Loads widgets with `Bangle.loadWidgets()`

## What is `clock_info`?

A built-in system for displaying dynamic "info cards" inside watchfaces. These show things like:

```text
[ 🔋 Battery: 82% ] ← Swipe or tap → [ 👟 Steps: 2,503 ]
```

They update automatically, handle interactivity, and can be extended by other apps (like for sunrise, weather, or timers).

## Install the Module

To use `clock_info`, you need to install the Clock Info app on your watch:

👉 [Install clock_info from the App Loader](https://banglejs.com/apps/?id=clockinfo)

Once installed, you can use it like a built-in module via `require("clock_info")`.

## Add Info Cards to Your Watchface

### Call `addInteractive(...)` Once

Add this near the top of your code, outside any draw loop:

```js
let infos = require("clock_info").load();
let clockInfoMenu = require("clock_info").addInteractive(infos, {
  x: 20,
  y: 130,
  w: 180,
  h: 50,
  draw: (itm, info, options) => {
    g.reset();
    g.clearRect(
      options.x,
      options.y,
      options.x + options.w,
      options.y + options.h
    );
    if (options.focus)
      g.drawRect(
        options.x,
        options.y,
        options.x + options.w,
        options.y + options.h
      );
    let midX = options.x + options.w / 2;
    if (info.img) g.drawImage(info.img, midX - 12, options.y + 4);
    g.setFont("6x8:2").setFontAlign(0, 1);
    g.drawString(info.text, midX, options.y + 44);
  },
});
```

`addInteractive(...)` sets up the touch/swipe handling and drawing callbacks. Call it once, not inside your main draw loop.

### Add `clockInfoMenu.redraw()` to your `draw()` Function

This tells clock_info to refresh and display the current info card:

```js
function draw() {
  // ... your time/date drawing logic ...
  clockInfoMenu.redraw();
}
```

## Minimal Working Example

Here's a complete minimal watchface with time, date, widgets and info cards:

```js
Bangle.setUI("clock");
Bangle.loadWidgets();

let infos = require("clock_info").load();
let clockInfoMenu = require("clock_info").addInteractive(infos, {
  x: 20,
  y: 130,
  w: 180,
  h: 50,
  draw: (itm, info, options) => {
    g.reset();
    g.clearRect(
      options.x,
      options.y,
      options.x + options.w,
      options.y + options.h
    );
    if (options.focus)
      g.drawRect(
        options.x,
        options.y,
        options.x + options.w,
        options.y + options.h
      );
    let midX = options.x + options.w / 2;
    if (info.img) g.drawImage(info.img, midX - 12, options.y + 4);
    g.setFont("6x8:2").setFontAlign(0, 1);
    g.drawString(info.text, midX, options.y + 44);
  },
});

function draw() {
  g.reset();
  g.setBgColor(1); // white background
  g.clear();
  Bangle.drawWidgets();

  let now = new Date();
  let time = require("locale").time(now, 1);
  let date = require("locale").date(now);

  g.setFontAlign(0, 0);
  g.setColor(0); // black text
  g.setFont("Vector", 40);
  g.drawString(time, g.getWidth() / 2, 60);
  g.setFont("6x8", 2);
  g.drawString(date, g.getWidth() / 2, 100);

  clockInfoMenu.redraw();
}

draw();
setInterval(draw, 60000);
```

## 🖐️ Using the Info Cards

You should now see something that looks like this:

```text
┌────────────────────┐
│ 12:34              │ ← Time
│ Wed 22 May         │ ← Date
│────────────────────│
│ 🔋 82%              │ ← Info Card Area
└────────────────────┘
```

You may only see the battery card in the info card area at first. That’s expected!

- Tap the info card area to focus it
- Swipe up/down to cycle through cards: steps, HRM, altitude, etc
- Swipe left/right if other apps have added categories

Some info (like steps) only appears after movement. Others (like HRM) only update after being tapped.

## 📦 Packaging Tip (Optional)

If you plan to upload your clock to the App Loader, include this in your `metadata.json`:

```json
"dependencies": {
  "clock_info": "module"
}
```

This ensures the clock_info app is installed automatically when users install your clock.

## What You Built

- A working, swipeable info card system
- Fully integrated into your watchface
- Automatically updates with Bangle.js sensors and apps

## What’s Next?

- [🎛 Create Menus and Custom UI](../custom-ui)
- [📦 Package Your App for the Loader](../app-packaging)
- [📘 Explore Clock Info Cards](https://banglejs.com/apps/?q=clkinfo)
