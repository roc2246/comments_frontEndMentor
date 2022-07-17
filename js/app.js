const express = require("express");
const app = express();
const path = require('path')

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
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../')
console.log(publicDirectoryPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("/insert", (req, res) => {
  let sql =
    "CREATE TABLE table4(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";

});


// Get Comment Data

app.get("/get", (req, res) => {
    let sql = "SELECT * FROM comments"
    db.query(sql, (error, result) => {
        if (error) {
          console.log(error);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.send(result);
      });
  });
const portNo = 3002
app.listen(portNo, () => {
  console.log("Server running on port " +portNo);
});
