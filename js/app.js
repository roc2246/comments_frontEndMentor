const express = require("express");
var session = require("express-session");
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

// Sets Session Variable
app.use(
  session({
    secret: "XASDASDA",
    resave: true,
    saveUninitialized: true,
  })
);
let sessionData;
app.get("/session", (req, res) => {
  sessionData = req.session;
  sessionData.user = {};
  let username = "juliusomo";
  let userID = 4;
  let avatar = "./images/avatars/image-juliusomo.png";
  sessionData.user.username = username;
  sessionData.user.user__id = userID;
  sessionData.user.avatar_png = avatar;
  console.log(
    "Setting session data:username=%s user__id=%s, and avatar_png=%s",
    username,
    sessionData.user.user__id,
    sessionData.user.avatar_png
  );
  res.json(sessionData.user);
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

// Posts New Comment
app.post("/add", (req, res) => {
  let sql = "INSERT INTO users (username, avatar_png, avatar_webp) VALUES ('TEST', 'EST', 'score')";
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log("TEST")
  });
})

const portNo = 3002;
app.listen(portNo, () => {
  console.log("Server running on port " + portNo);
});
