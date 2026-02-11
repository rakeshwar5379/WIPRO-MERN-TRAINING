const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student")
const app = express();

// DB connection
mongoose
  .connect("mongodb://localhost:27017/admin")
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

// Built-in middleware
app.use(express.json()); // JSON
app.use(express.urlencoded({ extended: true })); // Form data
app.use(express.static("publichtml"));

// POST - add student
app.post("/students", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "name and email are required" });
    }

    await Student.create({ name, email });
    res.json({ success: true, message: "Student data saved successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET - fetch students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});