const User = require("../models/User");
const router = require("express").Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);



router.get("/users", async (req, res) => {
  const users = await User.find().select("_id name email");
  res.json(users);
});
module.exports = router;