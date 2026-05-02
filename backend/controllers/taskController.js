const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    assignedTo: req.body.assignedTo,
    project: req.body.project
  });

  res.json(task);
};
exports.getTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("assignedTo", "name email")
    .populate("project", "name");

  res.json(tasks);
};