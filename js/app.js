const express = require("express");
var session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

const mysql = require("mysql");

// Body Parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
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
    "SELECT " +
    "comments.id, comments.user_id, users.username, " +
    "users.avatar_png, comments.content, " +
    "comments.content, comments.createdAt, " +
    "comments.score " +
    "FROM comments " +
    "INNER JOIN users " +
    "ON (users.id=comments.user_id) ";
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
    "SELECT " +
    "replies.id, replies.comment_id, users.username, users.avatar_png, " +
    "replies.replyTo, replies.reply_content, replies.reply_createdAt, replies.reply_score " +
    "FROM comments " +
    "INNER JOIN replies on comments.id = replies.comment_id " +
    "INNER JOIN users on users.id = replies.user_id";
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// Posts New Comment
app.post("/add", (req, res) => {
  let text = req.body.comment_text;
  let sql =
    `INSERT INTO comments (user_id, content, createdAt, score) VALUES (` +
    sessionData.user.user__id +
    `, '` +
    text +
    `', 'date', 0)`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(req.body);
  });
});

// Posts New Reply
app.post("/addReply", (req, res) => {
  let commentID = req.body.comment_id;
  let text = req.body.comment_text;
  let replyTo = req.body.reply_to;

  let sql =
    `INSERT INTO replies (comment_id, user_id, replyTo, reply_content, reply_createdAt, reply_score) 
  VALUES (` +
    commentID +
    `, ` +
    sessionData.user.user__id +
    `, '` +
    replyTo +
    `','` +
    text +
    `', 'date', 0)`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(req.body);
  });
});


// Posts New Reply TO Reply
app.post("/addReplyToReply", (req, res) => {
  let commentID = req.body.comment_id;
  let text = req.body.comment_text;
  let replyTo = req.body.reply_to;

  let sql =
    `INSERT INTO replies 
    (comment_id, user_id, replyTo, reply_content, reply_createdAt, reply_score) 
  VALUES (` +
    commentID +
    `, ` +
    sessionData.user.user__id +
    `, '` +
    replyTo +
    `','` +
    text +
    `', 'date', 0)`;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(req.body);
  });
});


// Update Score
app.post("/updateScore", (req, res) => {
  let userID = req.body.comment_index;
  let score = req.body.score;
  let scoreChange = req.body.upvote_or_downvote
  let sql = "UPDATE comments SET score=" + score + " "+scoreChange+" WHERE id=" + userID + "";
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});

// Update ReplyScore
app.post("/updateReplyScore", (req, res) => {
  let userID = req.body.comment_index;
  let score = req.body.score;
  let scoreChange = req.body.upvote_or_downvote
  let sql = "UPDATE replies SET reply_score=" + score + " "+scoreChange+" WHERE id=" + userID + "";
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});

// Update Reply
app.post("/updateReply", (req, res) => {
  let replyID = req.body.reply_index;
  let content = req.body.updated_reply;
  let sql = "UPDATE replies SET reply_content='" + content + "' WHERE id=" + replyID + "";
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});

// Update Comment
app.post("/updateComment", (req, res) => {
  let commentID = req.body.comment_index;
  let content = req.body.updated_comment;
  let sql = "UPDATE comments SET content='" + content + "' WHERE id=" + commentID + "";
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});

// Delete Comment
app.post("/deleteComment", (req, res) => {
  let commentID = req.body.delete_comment_id;
  let sql = "DELETE FROM comments WHERE comments.id="+commentID+"";

  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});

// Delete Reply
app.post("/deleteReply", (req, res) => {
  let replyID = req.body.delete_comment_id;
  let sql = "DELETE FROM replies WHERE replies.id="+replyID+"";

  db.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});

const portNo = 3002;
app.listen(portNo, () => {
  console.log("Server running on port " + portNo);
});
