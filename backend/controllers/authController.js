const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  // first user becomes admin
  const isFirstUser = (await User.countDocuments()) === 0;

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: isFirstUser ? "admin" : "member"
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id, role: user.role }, "secret");
  res.json({ token, user });
};