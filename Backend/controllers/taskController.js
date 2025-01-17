const Task = require('../models/Task');

const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

const addTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ userId: req.user.id, title, description });
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });
  await task.remove();
  res.json({ message: 'Task removed' });
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
