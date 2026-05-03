const router = require("express").Router();
const { auth, isAdmin } = require("../middleware/authMiddleware");
const { createProject, getProjects, addMember } = require("../controllers/projectController");

router.post("/", auth, isAdmin, createProject);
router.get("/", auth, getProjects);
router.put("/:id/members", auth, isAdmin, addMember);

module.exports = router;