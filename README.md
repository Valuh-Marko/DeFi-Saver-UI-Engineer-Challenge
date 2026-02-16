# DeFi Saver UI

A **React + TypeScript** project built as a UI challenge for DeFi Saver. This project demonstrates modern React development with TypeScript, Vite, animations, and Ethereum contract integrations.

## 🐄 Project Overview

This project provides a responsive and interactive UI for managing DeFi positions. It integrates with Ethereum smart contracts and uses modern frontend tools and libraries to optimize development workflow.

Key features:

* Fully typed with TypeScript.
* Uses **Vite** for fast development and build process.
* Integrates with **viem** and **@defisaver/tokens** for Ethereum interaction.
* Animations using `motion` for smooth UI transitions.
* SCSS support for styling.

---

## 🔧 Tech Stack & Dependencies

### Runtime Dependencies

* `@defisaver/tokens` — Token utilities for DeFi Saver integration
* `viem` — Ethereum client library
* `motion` — For animations and transitions
* `dotenv` — Environment variable management
* `p-limit` — Control concurrency for asynchronous tasks

### Dev Dependencies

* `vite` — Fast build tool and development server
* `typescript` — TypeScript compiler
* `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `typescript-eslint` — Code linting and style enforcement
* `sass` — SCSS support

---

## 🚀 Getting Started

### Prerequisites

* Node.js >= 20
* npm >= 9
* Git

### Installation

```bash
git clone https://github.com/Valuh-Marko/DeFi-Saver-UI-Engineer-Challenge.git
cd DeFi-Saver-UI-Engineer-Challenge
npm install
```

### Development

Start a local development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/DeFi-Saver-UI-Engineer-Challenge/`.
This is due to setting the base URL in order to deploy to GH pages.

### Build

Compile TypeScript and bundle with Vite:

```bash
npm run build
```

### Linting

Check code for linting issues:

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

### Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

*(Make sure `homepage` in `package.json` points to the correct GitHub Pages URL.)*

---

## ⚡ Clean Imports with Aliases

To keep imports short, readable, and maintainable, this project uses **TypeScript and Vite path aliases**.

### Example Aliases

| Alias | Points to |
|-------|-----------|
| `@components/*` | `src/components/*` |
| `@hooks/*` | `src/hooks/*` |
| `@lib/*` | `src/lib/*` |
| `@styles/*` | `src/styles/*` |
| `@models/*` | `src/models/*` |
| `@utils/*` | `src/utils/*` |
| `@assets/*` | `src/assets/*` |

### Example Usage

```ts
import { Button } from "@components";
import { usePositions } from "@hooks";
import { client } from "@lib";
import { Position } from "@models";
```

---

## 📝 Project Structure

```
src/
  ├─ assets/                       # Images, SVGs, etc.
  ├─ components/                   # Reusable React components
  |  ├─ index.ts                   # Used to export all the components for clean imports with Aliases
  |  ├─ button
  |  |  ├─ animations.ts
  |  |  ├─ button.tsx              # React component        
  ├─ contracts/                    # Ethereum contract ABIs and addresses
  ├─ hooks/                        # Custom React hooks
  ├─ lib/                          # Utility libraries
  ├─ models/                       # TypeScript interfaces and types
  ├─ pages/                        # Page-level components
  |  ├─ homePage
  |  |  ├─ homepage.tsx
  |  |  ├─ components              # Page specific non reausable UI components
  |  |  |  ├─ title
  |  |  |  |  ├─ title.tsx         # Page specific non reausable component                
  ├─ styles/                       # SCSS files
  └─ main.tsx                      # Entry point
```

---

## 🔗 Notes

* Uses TypeScript project references (`tsc -b`) for type checking before building.
* Animations are handled via `motion` library.
* Concurrent Ethereum calls are limited via `p-limit` for performance.
* SCSS is used for styling; you can add global and component-level styles.
