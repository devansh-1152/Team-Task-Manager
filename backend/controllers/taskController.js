const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      assignedTo: req.body.assignedTo,
      project: req.body.project,
      dueDate: req.body.dueDate
    });
    res.json(task);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

exports.getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "admin") {
      tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("project", "name");
    } else {
      tasks = await Task.find({ assignedTo: req.user.id })
        .populate("assignedTo", "name email")
        .populate("project", "name");
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json("Task not found");

    if (req.user.role !== "admin" && task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json("Not authorized to update this task");
    }

    if (req.user.role !== "admin") {
      // Member can only update status
      task.status = req.body.status || task.status;
    } else {
      // Admin can update all fields
      task.title = req.body.title || task.title;
      task.status = req.body.status || task.status;
      task.assignedTo = req.body.assignedTo || task.assignedTo;
      task.project = req.body.project || task.project;
      task.dueDate = req.body.dueDate || task.dueDate;
    }

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json("Deleted");
  } catch (error) {
    res.status(500).json("Server Error");
  }
};