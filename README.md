# Grocer-Ease Frontend


## Quick start

Prerequisites
- Node.js (recommended v16+ or latest LTS)
- npm (or yarn)

Local development
1. Install dependencies:
   npm install

2. Start the dev server:
   npm run dev

3. Build for production:
   npm run build


Note: This repository uses Vite and Tailwind CSS. Check `package.json` for exact scripts and dependencies.

## Project structure (top-level files)

- .gitignore
  - Lists files and folders Git should ignore (node_modules, build artifacts, env files, etc.).

- README.md
  - This file. Use it as the main project summary and quick-start guide.

- db.json
  - Local mock data file (JSON). Commonly used with json-server for local API mocking:
    npx json-server --watch db.json --port 5001
  - Contains sample data used by the frontend during development.

- eslint.config.js
  - ESLint configuration for code linting rules. Ensures consistent style and catches common problems.

- index.html
  - HTML entry point used by Vite. It usually mounts the front-end app (via a root div or similar).

- package.json
  - Project metadata, dependencies, and npm scripts. Look here for exact commands (dev, build, serve, lint, test).

- package-lock.json
  - npm lockfile to ensure repeatable installs with exact dependency versions.

- postcss.config.js
  - PostCSS configuration. Typically used to configure Tailwind CSS and other PostCSS plugins.

- tailwind.config.js
  - Tailwind CSS configuration file. Defines theme customizations, purge paths, and plugins.

- vite.config.js
  - Vite configuration. Controls dev server, build options, and plugin usage.

- public/
  - Static assets served as-is. Common contents: favicon, robots.txt, static images. Files here are copied to the build output.

- src/
  - Application source code (components, pages, styles, utilities). This is where the main work happens. Explore subfolders to find React/Vue/Svelte components, routes, and CSS files.

## Typical development notes

- Mock API: If you want to use the included `db.json` as a development API, install json-server:
  npx json-server --watch db.json --port 5001
  Then adjust the frontend API base URL to point to http://localhost:5001.

- Linting: Run linting per the scripts in `package.json` (e.g., npm run lint). ESLint config lives in `eslint.config.js`.

- Styling: Tailwind is configured in `tailwind.config.js` and usually enabled via `postcss.config.js`.

## Contributing

- Open an issue to discuss features or bugs.
- Fork and open pull requests for fixes and features.
- Keep changes small and focused, and follow existing code style and lint rules.


