const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      members: [req.user.id]
    });
    res.json(project);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

exports.getProjects = async (req, res) => {
  try {
    let projects;
    if (req.user.role === 'admin') {
      projects = await Project.find().populate("members", "name email");
    } else {
      projects = await Project.find({ members: req.user.id }).populate("members", "name email");
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json("Project not found");
    
    if (!project.members.includes(userId)) {
      project.members.push(userId);
      await project.save();
    }
    res.json(project);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};