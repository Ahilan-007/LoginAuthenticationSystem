const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;
const SECRET_KEY = "my$tr0ngS3cretKey123!"; // stronger secret

// Middleware
app.use(cors({
  exposedHeaders: ['x-access-token'] // allow frontend to read token if needed
}));
app.use(bodyParser.json());

// Mock user (replace with DB later if needed)
let user = {
  email: "test@example.com",
  password: bcrypt.hashSync("password123", 8), // hashed password
  name: "Test User"
};

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== user.email) {
    return res.status(400).json({ message: "User not found" });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Generate JWT token
  const token = jwt.sign({ email: user.email, name: user.name }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token, name: user.name });
});

// Protected dashboard route
app.get("/dashboard", (req, res) => {
  const token = req.headers["x-access-token"]; // match frontend

  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    res.json({ message: `Welcome to your dashboard, ${decoded.name}!`, user: decoded });
  });
});

// Forgot password (mock)
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  if (email !== user.email) {
    return res.status(400).json({ message: "Email not found" });
  }
  res.json({ message: "Password reset link sent to email (mock)." });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
