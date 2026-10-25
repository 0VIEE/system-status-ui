# System Alert — Developer Status HUD

A retro, RPG-inspired developer dashboard built with **HTML, CSS, and vanilla JavaScript**. The interface uses a dark purple terminal aesthetic, a typewriter boot message, live clock, player-stat bars, quest interactions, and an optional synthesized hover sound.

## Preview

- **[Open the live demo](https://lixnqkfpxev10hvok8us.codedex.me)**
- **[View the Codédex project](https://www.codedex.io/@OVIEE/build/system-alert-solo-developer-status-hud)**

## Features

- Animated terminal-style introduction with a reduced-motion alternative
- Live local clock
- Responsive player-status panel and progress bars
- Interactive quest selection and a locked-quest state
- Optional synthesized hover sound using the Web Audio API
- Keyboard focus styling and accessible status feedback
- Local avatar fallback if the original image is not present

## Built with

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts — Fira Code (with local monospace fallbacks)

No package manager or build step is required.

## Run locally

1. Clone or download this repository.
2. Open `index.html` in a browser.

For a local HTTP server, run the following from the project directory with Python installed:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Project structure

```text
system-status-ui/
├── assets/
│   └── avatar-placeholder.svg
├── index.html
├── script.js
├── style.css
└── README.md
```

## Personalizing the avatar

The page first looks for `assets/pic_for_code_project.webp`, matching the original project. That personal image is not included in this repository. If you have the image, place it at that path. Otherwise, the page automatically falls back to `assets/avatar-placeholder.svg`.

## What this project demonstrates

This project is a frontend exercise in responsive layout, CSS animation, DOM updates, event handling, basic Web Audio API usage, and accessible interaction states. The quest entries are UI demonstrations rather than links to separate applications.

## Scope

This is a personal learning project, not a production dashboard. The player levels and gear text are decorative profile content; they are not calculated from live data.

---

*Built as a personal UI project by OVIEE.*
