const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("express-myconnection");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  session({
    secret: "&$77a%-aam8nshxiab$&&",
    resave: false,
    saveUninitialized: true
  })
);
app.use(
  connection(mysql, {
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "forfun"
  }, "request")
);


app.get("/login", function(req, res) {
  
  const query = "SELECT * FROM users;";
  
  req.getConnection(function(err, conn) {
    console.log(err)
  
  
    conn.query(query, function(err, results) {
    
      if(err) { res.json(err) }
      
      if(results && results.length) {  
        res.send(results);
      }
          
    });
  });
     
});



app.get('/', function (req, res){

  res.send("haha");

  //res.sendFile(path.resolve(__dirname, "public", "index.html"))
});

app.listen(port)
console.log("server started on port " + port);




