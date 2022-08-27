const express = require("express");
var session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

const mysql = require("mysql");


const cors = require("cors");


app.use(cors());

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
    "replies.replyTo, replies.content, replies.createdAt, replies.score " +
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
    `INSERT INTO replies (comment_id, user_id, replyTo, content, createdAt, score) 
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
    (comment_id, user_id, replyTo, content, createdAt, score) 
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
app.get("/updateScore/:id", (req, res) => {
  let commentID = parseInt(req.params.id);
  let sql = "SELECT score FROM comments WHERE  id=?";
  db.query(sql, [commentID], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});

app.patch("/updateScore/:id", (req, res) => {
  let commentID = parseInt(req.params.id);
  let score = req.body.score;
  console.log(score)
  let sql = "UPDATE comments SET score=? WHERE id=?";
  db.query(sql, [score, commentID] ,(error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});



// Update ReplyScore
app.get("/updateReplyScore/:id", (req, res) => {
  let commentID = parseInt(req.params.id);
  let sql = "SELECT score FROM replies WHERE  id=?";
  db.query(sql, [commentID], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});

app.patch("/updateReplyScore/:id", (req, res) => {
  let commentID = parseInt(req.params.id);
  let score = req.body.score;
  console.log(score)
  let sql = "UPDATE replies SET score=? WHERE id=?";
  db.query(sql, [score, commentID] ,(error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});


// Update Comment
app.get("/updateComment/:id", (req, res) => {
  let commentID = parseInt(req.params.id);
  let sql = "SELECT * FROM comments WHERE  id=?";
  db.query(sql, [commentID], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});

app.patch("/updateComment/:id", (req, res) => {
  let commentID = parseInt(req.params.id);
  console.log(commentID)
  let content = req.body.updated_comment;
  let sql = "UPDATE comments SET content=? WHERE id=?";
  db.query(sql, [content, commentID] ,(error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});

// Update Reply
app.get("/updateReply/:id", (req, res) => {
  let commentID = parseInt(req.params.id);
  let sql = "SELECT * FROM replies WHERE  id=?";
  db.query(sql, [commentID], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});

app.patch("/updateReply/:id", (req, res) => {
  let commentID = parseInt(req.params.id);
  console.log(commentID)
  let content = req.body.updated_comment;
  let sql = "UPDATE replies SET content=? WHERE id=?";
  db.query(sql, [content, commentID] ,(error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});

// Delete Comment
app.get("/deleteComment/:id", (req, res) => {
  let commentID = parseInt(req.params.id);
  console.log(commentID)
  let sql = "SELECT * FROM comments WHERE id=?";
  db.query(sql, [commentID], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(sql)
  });
});

app.delete("/deleteComment/:id", (req, res) => {
  let commentID = parseInt(req.params.id);
  console.log(commentID)
  let sql = "DELETE FROM comments WHERE id=?";
  db.query(sql, [commentID] ,(error, result) => {
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

const portNo = 3000;
app.listen(portNo, () => {
  console.log("Server running on port " + portNo);
});
