const Project = require("../models/Project");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json("Project name is required");
    }

    const project = await Project.create({
      name: req.body.name,
      members: []   // keep this (important for future)
    });

    res.status(201).json(project);

  } catch (err) {
    console.error("PROJECT ERROR:", err);
    res.status(500).json("Error creating project");
  }
};
// GET PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("members");
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error fetching projects");
  }
};