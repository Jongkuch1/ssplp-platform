# Deploying SSPLP Backend to Render

This file describes the recommended Render settings to deploy the backend Express app in this repository.

Recommended (preferred): deploy the `backend` as a Render Web Service

- In Render dashboard → New → Web Service → Connect your GitHub repo.
- Branch: `main`
- Root Directory: `backend` (preferred) OR leave empty and use the root `package.json` (alternate below).
- Build Command: `npm install`
- Start Command: `npm start`  # `backend/package.json` defines `start: node server.js`
- Environment:
  - Add `MONGODB_URI` with your MongoDB connection string.
  - Add any other secrets (JWT secret, email creds, etc.) via Render's Environment tab.

Notes:
- The backend listens on `process.env.PORT || 5000`. Render provides `PORT` automatically.
- Health check path: `GET /api/health` returns `{ status: 'OK' }`.
- If you choose Root Directory = `backend`, Render will run `npm install` and `npm start` inside `backend`.

Alternate: keep deploy from repository root (we added a root `package.json`)

- Root `package.json` runs a `postinstall` that installs backend dependencies and a `start` script that runs `node backend/server.js`.
- In Render, if you keep Root Directory empty:
  - Build Command: `npm install`
  - Start Command: `npm start`

Optional: `render.yaml` (Infrastructure-as-code)

You can create a `render.yaml` to declare the service configuration. A minimal example (customize names and region):

```yaml
services:
  - type: web
    name: ssplp-backend
    env: node
    region: oregon
    branch: main
    buildCommand: "npm install"
    startCommand: "npm start"
    plan: free
    repository: https://github.com/Jongkuch1/ssplp-platform
    root: backend
```

Troubleshooting
- If deployment fails, open the Render deploy logs (Dashboard → your service → Events / Logs) and look for build errors and `postinstall` output.
- Common issue: missing `MONGODB_URI` or other environment variables — add them in Render's Environment tab.
- If you previously pushed `node_modules` to the repo, make sure `.gitignore` contains `node_modules/` (already added) and that you removed tracked `node_modules` (already done).

Local testing commands

```bash
# from repo root
npm install
npm start

# or run backend directly
cd backend
npm install
npm start
```

If you want, I can also add a `render.yaml` to the repo and push it for you — say "add render.yaml" and I will create and push one.
