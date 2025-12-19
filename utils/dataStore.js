// Simple in-memory store (module-scoped). Swap with DB for persistence.
exports.tasks = [
    {
        id: 1,
        title: "Set up environment",
        description: "Install Node.js, npm, and git",
        completed: true,
        priority: "medium",
        createdAt: new Date().toISOString()
    }
]; // each task: { id, title, description, completed, priority, createdAt, updatedAt }