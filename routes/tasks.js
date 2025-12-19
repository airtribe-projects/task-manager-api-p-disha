const express = require('express');
const { body, param, query } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/tasksController');
const { handleValidationErrors } = require('../middlewares/validation');


router.get('/', [
    query('completed').optional().isBoolean().withMessage('completed must be boolean'),
    query('sort').optional().isIn(['createdAt', 'title', 'priority']).withMessage('invalid sort field'),
    query('order').optional().isIn(['asc', 'desc']).withMessage('order must be asc or desc'),
    query('priority').optional().isIn(['low', 'medium', 'high']).withMessage('invalid priority')
], handleValidationErrors, controller.listTasks);


router.get('/priority/:level', [param('level').isIn(['low', 'medium', 'high']).withMessage('invalid priority')], handleValidationErrors, controller.getByPriority);


// tasks.js - Updated validation to accept integer IDs
router.get('/:id', [param('id').isInt().withMessage('invalid id')], handleValidationErrors, controller.getTask);

router.post('/', [
    body('title').exists().withMessage('title is required').bail().isString().withMessage('title must be string').bail().notEmpty().withMessage('title cannot be empty'),
    body('description').exists().withMessage('description is required').bail().isString().withMessage('description must be string').bail().notEmpty().withMessage('description cannot be empty'),
    body('completed').optional().isBoolean().withMessage('completed must be boolean'),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('priority must be low, medium or high')
], handleValidationErrors, controller.createTask);

router.put('/:id', [
    param('id').isInt().withMessage('invalid id'),
    body('title').optional().isString().withMessage('title must be string').bail().notEmpty().withMessage('title cannot be empty'),
    body('description').optional().isString().withMessage('description must be string').bail().notEmpty().withMessage('description cannot be empty'),
    body('completed').optional().isBoolean().withMessage('completed must be boolean'),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('priority must be low, medium or high')
], handleValidationErrors, controller.updateTask);

router.delete('/:id', [param('id').isInt().withMessage('invalid id')], handleValidationErrors, controller.deleteTask);


module.exports = router;