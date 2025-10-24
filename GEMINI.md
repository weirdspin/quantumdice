# Project: Quantum Dice

## Project Overview

Quantum Dice is a minimalist, provably fair dice game designed as a single-page web application. The project's primary goal is to serve as a portfolio piece to showcase proficiency in frontend development, game logic, and key iGaming concepts like House Edge and Provably Fair systems.

The application allows a player to bet on the outcome of a virtual 100-sided dice roll. The player can configure their bet by setting a bet amount and choosing a target number, with the payout dynamically calculated based on the risk. The UI is a dark-themed, three-column layout inspired by the Stake platform.

The core technologies used are React with Vite for the frontend. The project emphasizes a clean separation of concerns, with game logic isolated from the UI components.

## Building and Running

### Setup

Install the necessary dependencies:

```bash
npm install
```

### Development

To run the application in development mode:

```bash
npm run dev
```

This will start a local development server, typically at `http://localhost:5173`.

### Production

To build the application for production:

```bash
npm run build
```

The production-ready files will be placed in the `dist` directory. The project is intended to be deployed to GitHub Pages.

## Development Conventions

The project follows a structured, sequential implementation plan:

1.  **Core Logic First:** The core game logic (payout calculation, seed generation, roll result) is implemented in a separate, plain JavaScript file (`gameLogic.js`) before building the UI.
2.  **Component-Based UI:** The user interface is built with React, with distinct components for different parts of the UI (`BetControls.jsx`, `PayoutDisplay.jsx`, `GameHistory.jsx`).
3.  **State Management:** The application state (balance, bet amount, slider value, etc.) is managed using React's `useState` hook in the main `App.jsx` component.
4.  **Provably Fair System:** A simplified but functional "Provably Fair" system is implemented using a server seed, a client seed, and a nonce.
5.  **Styling:** The project uses a dark-mode theme, with styling implemented via CSS/SCSS or a framework like Tailwind CSS.
