---
title: Build a Custom Watchface
description: Create your own digital clock face that updates in real time and appears in the launcher.
---

Your Bangle.js can show _any_ clock face you like. In this tutorial, you'll build your own from scratch: a real app that shows the time and date, updates itself automatically, and appears in the app launcher like any other clock.

## Prerequisites

- You've completed [Write Your First App](./first-app/).
- Your Bangle.js is connected via the [Espruino Web IDE](https://www.espruino.com/ide/).

## Draw the Time

Let’s start by drawing the current time in the middle of the screen.

Paste this code into the Editor pane (right side) of the IDE:

```js
function draw() {
  g.reset();
  g.setBgColor(0, 0, 0);
  g.clear();
  let time = require("locale").time(new Date(), 1);
  g.setColor(1, 1, 1);
  g.setFontAlign(0, 0);
  g.setFont("Vector", 40); // built-in scalable font
  g.drawString(time, g.getWidth() / 2, g.getHeight() / 2);
}

draw();
setInterval(draw, 1000);
```

**You should see:**

```
12:34
```

## Add the Date

Let’s add today’s date underneath the time.

Replace your `draw()` function with:

```js
function draw() {
  g.reset();
  g.setBgColor(0, 0, 0);
  g.clear();

  let now = new Date();
  let time = require("locale").time(now, 1);
  let date = require("locale").date(now);

  g.setColor(1, 1, 1);
  g.setFontAlign(0, 0);

  // Time
  g.setFont("Vector", 40);
  g.drawString(time, g.getWidth() / 2, 60);

  // Date
  g.setFont("6x8", 2);
  g.drawString(date, g.getWidth() / 2, 110);
}

draw();
setInterval(draw, 1000);
```

<!-- Screenshot placeholder: show time and date on screen -->

## Enable the Launcher Button

Bangle.js has a neat one-liner way to tell the system that your app is a watch. Add the following at the top level of your code (outside any function):

```js
Bangle.setUI("clock");
```

This tells the system that the app is a clock, and brings in a bunch of good defaults with it, such as allowing users to easily exit to the launcher, behave correctly with Settings > Set Clock.

## Show Widgets

Clocks usually display widgets (battery, Bluetooth, etc.) at the top.

Add this **after** `Bangle.setUI("clock")`:

```js
Bangle.loadWidgets();
Bangle.drawWidgets();
```

## Power Saving (Optional but Good Practice)

You don’t need to draw the time when the screen is off. This saves battery.

Replace your `setInterval(draw, 1000);` with code to account for this.

The script should now look like this:

```js
Bangle.setUI("clock");
Bangle.loadWidgets();

function draw() {
  g.reset();
  g.setBgColor(0, 0, 0);
  g.clear();

  Bangle.drawWidgets();

  g.setColor(1, 1, 1);

  let now = new Date();
  let time = require("locale").time(now, 1);
  let date = require("locale").date(now);

  g.setFontAlign(0, 0);

  let yMid = (Bangle.appRect.y + Bangle.appRect.y2) / 2;

  g.setFont("Vector", 40);
  g.drawString(time, g.getWidth() / 2, yMid - 20);

  g.setFont("6x8", 2);
  g.drawString(date, g.getWidth() / 2, yMid + 20);
}

draw();

let drawInterval = setInterval(draw, 1000);

Bangle.on("lcdPower", (on) => {
  if (on) {
    draw();
    if (drawInterval) clearInterval(drawInterval);
    drawInterval = setInterval(draw, 1000);
  } else {
    if (drawInterval) {
      clearInterval(drawInterval);
      drawInterval = undefined;
    }
  }
});
```

## Save as a Clock App

### Save the Code

1. Click the Upload icon in the Web IDE
2. Save it to Storage as:

```
myclock.app.js
```

### Add the App Info File

To appear in the launcher, create an .info file via the console (left side).

```js
require("Storage").write("myclock.info", {
  id: "myclock",
  name: "My Clock",
  type: "clock",
  src: "myclock.app.js",
});
```

## Launch It

On your watch:

1. Hold the button (\~3 seconds) to open the launcher
2. Tap **My Clock** to launch it
3. To make it your default clock, open **Settings → Set Clock**

## 🎨 Customise Further

- Try different fonts, e.g. `"7x11Numeric7Seg:4"` for a digital look
- Create your own fonts with the [Font Converter](https://www.espruino.com/Font+Converter)
- Add an icon with `g.drawImage()`
- Show seconds
- Only update once a minute for better battery life

## ✅ What You Built

- A clock that shows live time and date
- Saved as a proper app in your watch
- Widget-compatible and launcher-ready
- Customisable with fonts, updates, and more

## 🚀 What’s Next?

- [🔹 Add Clock Info](./add-clock-info)
