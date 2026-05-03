const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // important

const app = express();

app.use(cors());
app.use(express.json());

// ✅ FIXED: mongoose (not mmongoose)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.listen(5000, () => console.log("Server running"));