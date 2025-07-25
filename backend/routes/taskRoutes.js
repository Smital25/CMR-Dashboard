const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskStats, // ✅ Make sure this is included in the controller and used below
} = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');

// ✅ Apply middleware to all task routes
router.use(protect);

// ✳️ Task routes
router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

// 📊 Stats for dashboard
router.get('/stats', getTaskStats); // <-- This line must come AFTER router.get('/')!

module.exports = router;


