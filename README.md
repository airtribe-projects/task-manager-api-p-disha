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
See original assignment for details. Supports filtering, sorting, and priority-based queries.


## Notes
- Data is ephemeral (in-memory). For persistence, replace `utils/dataStore.js` with a DB-backed module (MongoDB / Postgres / SQLite).
- Tests run in `NODE_ENV=test` and the server does not listen on the port during tests.


#Test Results:
> task-manager-api@1.0.0 test
> jest --runInBand

POST /tasks 201 9.908 ms - 197
GET /tasks/441a7817-75dc-4380-92a1-529ca36fef9f 200 2.041 ms - 197
PUT /tasks/441a7817-75dc-4380-92a1-529ca36fef9f 200 1.908 ms - 196
GET /tasks 200 1.113 ms - 198
DELETE /tasks/441a7817-75dc-4380-92a1-529ca36fef9f 200 0.875 ms - 230
 PASS  tests/tasks.test.js
  Task Manager API                                                                                   
   
    √ POST /tasks - create task (55 ms)
    
    √ GET /tasks/:id - retrieve task (11 ms) 
    
    √ PUT /tasks/:id - update task (11 ms)
    
    √ GET /tasks - list tasks (9 ms)
    
    √ DELETE /tasks/:id - delete task (9 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.388 s, estimated 2 s
Ran all test suites.
