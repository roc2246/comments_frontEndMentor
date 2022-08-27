// const os = require('os')
// console.log("______________________________")
// console.log(os.hostname())

// if (os.hostname() === "http://localhost:3000") {
  // var host = "localhost";
  // var user = "root";
  // var password = "root";
  // var database = "comments";
// } else {
  var host = "wh963069.ispot.cc";
  var user = "childswe_commentsc";
  var password = "qc4PsP5Y";
  var database = "childswe_comments";
// }

// Create Connection
const mysql = require("mysql");
const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

module.exports = db;
