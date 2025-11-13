# Repository Guidelines

## Project Structure & Module Organization
- `app.js`: Express app entry (ES modules).
- `routes/`: Route definitions (e.g., `routeAccueil.js`).
- `controllers/`: Request handlers (e.g., `controllerClients.js`).
- `models/`: Database access (e.g., `modelChambres.js`).
- `views/`: EJS templates for UI.
- `public/`: Static assets (CSS/JS/images).
- `config/`: DB and app configuration (move secrets to `.env`).

## Build, Test, and Development Commands
- `npm install` — install dependencies.
- `node app.js` — start the server (defaults to port 3010).
- `set PORT=3010 && node app.js` (Windows) — run on a custom port.
- Optional: add `npm run dev` with `nodemon` for auto‑reload.

## Coding Style & Naming Conventions
- JavaScript (ESM): use `import`/`export`. 2‑space indent; consistent semicolons.
- Files: `route*.js`, `controller*.js`, `model*.js` to mirror responsibilities.
- Naming: lowerCamelCase for variables/functions; PascalCase for classes.
- EJS: snake‑case templates; partials under `views/partials/`.

## Testing Guidelines
- Frameworks: Jest + Supertest recommended for routes/controllers.
- Location: `tests/` mirroring `routes/` and `controllers/`.
- Names: `*.test.js` (e.g., `routes/routeClients.test.js`).
- Run: configure `npm test`; target ≥80% coverage.

## Commit & Pull Request Guidelines
- Commits: concise, imperative. Prefer Conventional Commits (e.g., `feat(auth): add login route`).
- PRs: clear description, linked issues, screenshots for UI changes, and test notes.
- Keep PRs focused; update docs when behavior changes.

## Security & Configuration
- Do not commit credentials. Move values from `config/configDB.js` to `.env` and load via `process.env`.
- Add `.env` to `.gitignore`; rotate any leaked keys.
- Validate and sanitize inputs; use parameterized queries via `mysql2/promise`.

