const express= require('express');
const{ getTask, addTask, updateTask, deleteTask }= require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const router=express.router();

router.get('/', protect, getTask);
router.add('/', protect, addTask);
router.update('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports=router;