const router = require("express").Router();
const { auth, isAdmin } = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.post("/", auth, isAdmin, createTask);
router.get("/", auth, getTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, isAdmin, deleteTask);

module.exports = router;