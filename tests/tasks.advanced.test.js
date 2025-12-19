const request = require('supertest');
const app = require('../index');

describe('Task Manager API - Advanced Features', () => {

    describe('Input Validation', () => {
        test('POST /tasks should return 400 if title is missing', async () => {
            const res = await request(app).post('/tasks').send({ description: 'desc' });
            expect(res.statusCode).toBe(400);
            expect(res.body.errors).toBeDefined();
        });

        test('POST /tasks should return 400 if completed is not boolean', async () => {
            const res = await request(app).post('/tasks').send({ title: 'T', description: 'D', completed: 'yes' });
            expect(res.statusCode).toBe(400);
        });

        test('POST /tasks should return 400 if priority is invalid', async () => {
            const res = await request(app).post('/tasks').send({ title: 'T', description: 'D', priority: 'mega-high' });
            expect(res.statusCode).toBe(400);
        });
    });

    describe('Filtering and Sorting', () => {
        // Note: Store already has 1 item (ID 1, medium priority, completed true)

        beforeAll(async () => {
            await request(app).post('/tasks').send({ title: 'A Task', description: 'D', completed: true, priority: 'low' });
            await new Promise(r => setTimeout(r, 10));
            await request(app).post('/tasks').send({ title: 'B Task', description: 'D', completed: false, priority: 'high' });
            await new Promise(r => setTimeout(r, 10));
            await request(app).post('/tasks').send({ title: 'C Task', description: 'D', completed: true, priority: 'medium' });
        });

        test('GET /tasks?completed=true should return only completed tasks', async () => {
            const res = await request(app).get('/tasks?completed=true');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            res.body.forEach(task => {
                expect(task.completed).toBe(true);
            });
            // Should include ID 1 and others
            expect(res.body.some(t => t.id === 1)).toBe(true);
        });

        test('GET /tasks?completed=false should return only incomplete tasks', async () => {
            const res = await request(app).get('/tasks?completed=false');
            expect(res.statusCode).toBe(200);
            res.body.forEach(task => {
                expect(task.completed).toBe(false);
            });
        });

        test('GET /tasks?sort=createdAt&order=asc should return tasks in creation order (oldest first)', async () => {
            const res = await request(app).get('/tasks?sort=createdAt&order=asc');
            expect(res.statusCode).toBe(200);

            const dates = res.body.map(t => new Date(t.createdAt).getTime());
            const sortedDates = [...dates].sort((a, b) => a - b);
            expect(dates).toEqual(sortedDates);
            // ID 1 should be first usually
            expect(res.body[0].id).toBe(1);
        });

        test('GET /tasks?sort=createdAt&order=desc should return tasks in reverse creation order', async () => {
            const res = await request(app).get('/tasks?sort=createdAt&order=desc');
            expect(res.statusCode).toBe(200);
            const dates = res.body.map(t => new Date(t.createdAt).getTime());
            const sortedDates = [...dates].sort((a, b) => b - a);
            expect(dates).toEqual(sortedDates);
        });

        test('GET /tasks?sort=priority&order=desc should sort high > medium > low', async () => {
            const res = await request(app).get('/tasks?sort=priority&order=desc');
            expect(res.statusCode).toBe(200);
            // high > medium > low
            // Check first is high
            expect(res.body[0].priority).toBe('high');
            // Check last is low
            expect(res.body[res.body.length - 1].priority).toBe('low');
        });
    });

    describe('Priority Endpoints', () => {
        test('GET /tasks/priority/high should return high priority tasks', async () => {
            const res = await request(app).get('/tasks/priority/high');
            expect(res.statusCode).toBe(200);
            expect(res.body.every(t => t.priority === 'high')).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

});
