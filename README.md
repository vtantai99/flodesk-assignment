# Assignment Summary

This project is a **React + TypeScript + Vite** app, built with a simple setup for fast development and code quality.

## Setup
- Used **Vite** with `@vitejs/plugin-react` for quick updates (HMR).
- Added **ESLint** with TypeScript rules and React plugins for clean code.

## Running the App
- Install dependencies: `npm install`
- Start the development server: `npm run dev`
- Open `http://localhost:5173` in your browser.
- Build for production: `npm run build`

## Styling
- Used **CSS Modules** to keep styles scoped and avoid conflicts.
- Added **typed-css-modules** to auto-generate types for CSS, making styling easier with auto-suggestions.

## Responsive Design
- App works on **mobile**, **tablet**, and **desktop** with flexible layouts.

## Animations
- Used **Framer Motion** for simple animations (e.g., transitions). It’s not a CSS/UI framework, just a tool for smooth effects.

## Code Quality & Testing
- No `any` types; everything has clear TypeScript types.
- **Unit tests** for components and utilities.
- **Integration tests** for combined components inside `features` folder.
- **E2E tests** with **Playwright** to check full user flows.

## Pre-Commit Checks
- **ESLint** and **conventional commits** enforced before commits.
- Ready to add unit test checks for production.

## Summary
This project is a responsive, well-tested React app with type-safe code, modular styles, and simple animations. It’s built for scalability and maintainability.