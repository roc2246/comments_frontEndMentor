const express = require("express");
const app = express();
const path = require("path");

const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "comments",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

// Sets CORS policy
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Get user data
app.get("/users", (req, res) => {
  let sql = "SELECT * FROM users";
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// Get Comment Data
app.get("/comments", (req, res) => {
  let sql =
    "SELECT * FROM comments INNER JOIN users ON (users.user_id=comments.comment_id)";
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

const portNo = 3002;
app.listen(portNo, () => {
  console.log("Server running on port " + portNo);
});
