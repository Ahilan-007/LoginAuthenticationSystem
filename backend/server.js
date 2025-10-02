require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware
app.use(cors({ exposedHeaders: ['x-access-token'] }));
app.use(bodyParser.json());

// Build MongoDB URI from environment variables
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

// Register route
app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (await User.findOne({ email })) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = bcrypt.hashSync(password, 8);
    await new User({ email, password: hashedPassword, name }).save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ email: user.email, name: user.name }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token, name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected dashboard route
app.get("/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    try {
      const user = await User.findOne({ email: decoded.email }).select("-password");
      res.json({ message: `Welcome to your dashboard, ${user.name}!`, user });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });
});

// Forgot password route (mock)
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });
    res.json({ message: "Password reset link sent to email (mock)." });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
