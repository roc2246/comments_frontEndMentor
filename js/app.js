const express = require("express");
var session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

const mysql = require("mysql");

// Body Parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

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
    "SELECT "
    +"comments.user_id, users.username, "
    +"users.avatar_png, comments.content, "
    +"comments.content, comments.createdAt, "
    +"comments.score, comments.replies "

    // +", replies.reply_content, replies.reply_score "
    
    + "FROM comments " 
    +"INNER JOIN users "
    +"ON (users.id=comments.user_id) " 

    // + "INNER JOIN replies "
    // +"on (comments.id=replies.comment_id)";
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// Get replies
app.get("/replies", (req, res) => {
  let sql =
    "SELECT "
    +"replies.user_id, users.username, "
    +"users.avatar_png, replies.content, "
    +"replies.createdAt, replies.score "
    + "FROM replies " 
    + "INNER JOIN users "
    +"on (users.id=replies.user_id)";
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// Posts New Comment
app.post("/add", (req, res) => {
  let text = req.body.comment_text
  let sql = `INSERT INTO comments (user_id, content, createdAt, score) VALUES (`+ sessionData.user.user__id +`, '`+text+`', 'date', 0)`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(req.body)
  });
})

const portNo = 3002;
app.listen(portNo, () => {
  console.log("Server running on port " + portNo);
});
