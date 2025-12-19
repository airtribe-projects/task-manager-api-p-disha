# Task Manager API (multi-file)


This repository contains a GitHub-ready Node.js + Express RESTful API for managing tasks. It uses an in-memory store by default and includes basic tests with **Jest** and **Supertest**.


## Quick start
1. `git clone <repo>`
2. `npm install`
3. `npm run dev` (development) or `npm start`
4. Run tests: `npm test`


## Project structure
- `index.js` - app entrypoint
- `routes/tasks.js` - route definitions
- `controllers/tasksController.js` - request handlers
- `middlewares/validation.js` - validation error handler
- `utils/dataStore.js` - in-memory store
- `tests/tasks.test.js` - integration tests
- `.gitignore`, `package.json`, `README.md`


## Endpoints
## Endpoints

### Tasks
- `GET /tasks`: Retrieve all tasks.
    - Query Params:
        - `completed` (boolean): Filter by completion status.
        - `sort`: Sort by `createdAt`, `title`, or `priority`.
        - `order`: `asc` or `desc`.
        - `priority`: Filter by priority level (`low`, `medium`, `high`).
- `GET /tasks/:id`: Retrieve a specific task by ID.
- `POST /tasks`: Create a new task.
    - Body: `title` (string, required), `description` (string, required), `completed` (boolean), `priority` (low/medium/high).
- `PUT /tasks/:id`: Update an existing task.
- `DELETE /tasks/:id`: Delete a task.

### Priority
- `GET /tasks/priority/:level`: Retrieve tasks by priority level (`low`, `medium`, `high`).


## Notes
- Data is ephemeral (in-memory). For persistence, replace `utils/dataStore.js` with a DB-backed module (MongoDB / Postgres / SQLite).
- Tests run in `NODE_ENV=test` and the server does not listen on the port during tests.


/* ---------- .github/workflows/nodejs.yml (optional) ---------- */
# Place this under .github/workflows to enable CI on GitHub Actions
name: Node CI
on: [push, pull_request]
jobs:
build:
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v4
- name: Use Node.js
uses: actions/setup-node@v4
with:
node-version: '18'
- run: npm ci
- run: npm test