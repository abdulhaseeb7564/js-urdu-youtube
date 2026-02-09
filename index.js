const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("DB connection error", err);
  } else {
    console.log("MYSQL Connected");
  }
});

// login api
app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

    const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
//   const sql = "SELECT * FROM user WHERE name = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.json({ success: false, message: "Database error" });

    if (result.length > 0) {
      res.json({ success: true, message: "Login Successful" });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  });
});
app.listen(3003, () => {
  console.log("Server running on port 3003");
});
