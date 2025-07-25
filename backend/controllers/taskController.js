const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const newTask = new Task({ ...req.body, createdBy: req.user._id }); // ✅ Fixed
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Task creation failed' });
  }
};

// Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id }); // ✅ Fixed
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Fetching tasks failed' });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};

// Get task statistics grouped by status
exports.getTaskStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await Task.aggregate([
      { $match: { createdBy: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStats = {
      pending: 0,
      'in-progress': 0,
      completed: 0,
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
    });

    res.json(formattedStats);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get task stats' });
  }
};
