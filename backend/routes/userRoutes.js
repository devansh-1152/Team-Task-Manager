const router = require("express").Router();
const { auth, isAdmin } = require("../middleware/authMiddleware");
const { getUsers } = require("../controllers/userController");

router.get("/", auth, isAdmin, getUsers);

module.exports = router;
