const Task = require("../models/Task");
const router = require("express").Router();
const { createTask, getTasks } = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
});
router.post("/", auth, createTask);
router.get("/", auth, getTasks);

router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json("Task deleted");
  } catch (err) {
    console.error(err);
    res.status(500).json("Delete failed");
  }
});
module.exports = router;