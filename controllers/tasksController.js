const store = require('../utils/dataStore');
const { v4: uuidv4 } = require('uuid');


// tasksController.js - Updated for Integer IDs
exports.listTasks = (req, res) => {
    let result = [...store.tasks];
    if (req.query.completed !== undefined) {
        const completed = req.query.completed === 'true';
        result = result.filter(t => t.completed === completed);
    }
    if (req.query.priority) {
        result = result.filter(t => t.priority === req.query.priority);
    }
    if (req.query.sort) {
        const field = req.query.sort;
        const order = req.query.order === 'desc' ? -1 : 1;
        result.sort((a, b) => {
            if (field === 'createdAt') return (new Date(a.createdAt) - new Date(b.createdAt)) * order;
            if (field === 'priority') {
                const rank = { low: 1, medium: 2, high: 3 };
                return (rank[a.priority] - rank[b.priority]) * order;
            }
            return a.title.localeCompare(b.title) * order;
        });
    }
    res.json(result);
};


exports.getByPriority = (req, res) => {
    const level = req.params.level;
    const filtered = store.tasks.filter(t => t.priority === level);
    res.json(filtered);
};


exports.getTask = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = store.tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
};


exports.createTask = (req, res) => {
    const { title, description } = req.body;
    const completed = req.body.completed === undefined ? false : req.body.completed;
    const priority = req.body.priority || 'medium';

    const maxId = store.tasks.length > 0 ? Math.max(...store.tasks.map(t => t.id)) : 0;
    const newTask = {
        id: maxId + 1,
        title: title.trim(),
        description: description.trim(),
        completed: Boolean(completed),
        priority,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    store.tasks.push(newTask);
    res.status(201).json(newTask);
};


exports.updateTask = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = store.tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: 'Task not found' });


    const { title, description, completed, priority } = req.body;
    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (completed !== undefined) task.completed = Boolean(completed);
    if (priority !== undefined) task.priority = priority;
    task.updatedAt = new Date().toISOString();
    res.json(task);
};


exports.deleteTask = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const idx = store.tasks.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Task not found' });
    const deleted = store.tasks.splice(idx, 1)[0];
    res.json({ message: 'Task deleted', task: deleted });
};