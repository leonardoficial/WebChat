const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("express-myconnection");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

//const http = require("http");

//server = http.createServer(app);

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

function add_action(obj) {
  const query = "INSERT INTO chat (userid, type, name, body)"
  + "VALUES ("+obj.userid+", 'action', '"+obj.name+"','"+obj.type+"');";
  
  obj.req.getConnection(function(err, conn) {
    conn.query(query, function(err, results) {
    
      if(err) { console.log(err); }
      
    });
  });

}

// #
app.post("/login", function(req, res) {

  if(req.session.user) {
    return res.json({status: "logged"});
  }
  
  const name  = req.body.name;
  const pass  = req.body.pass;
  
  const query = "SELECT * FROM users WHERE name='"+name+"' AND pass='"+pass+"';";
  
  /*
  if(!req.session.user && name && pass) {
    return res.json({status: "empty"});
  }*/
  
  req.getConnection(function(err, conn) {
    conn.query(query, function(err, results) {
    
      if(err) { res.json(err); }
      
      if(results && results.length) {
        req.session.user = results[0]
        
        app.use(["/messages", "/post"], function(req2, res2, next) {
          req2.session = req.session;
          next();
        });
        
        add_action({
          req: req,
          type: "logon",
          userid: req.session.user.id,
          name: req.session.user.name
        })
        
        res.json({status: "logged"});
      }
      else {
        res.json({status: "none"});
      }
    });
  });
  
});

// #
app.post("/exit", function(req, res) {
  const username = req.session.user.name;
  const userid   = req.session.user.id;
  
  try {
    req.session.destroy(function(err) {
      if(err) return res.json({status: "ERROR"});
      
      add_action({
          req: req,
          type: "logoff",
          userid: userid,
          name: username
        })
      
      res.json({status: "OK"});
    });
  } catch(err) {
    console.log(err)
  }
});

// #
app.post("/register", function(req, res) {
  const b = req.body;
  /*
  const test1 = "SELECT * FROM users WHERE name='"+b.name+"';";
  
  req.getConnection(function(err, conn) {
    if(err) console.log(err);
    conn.query(test1, function(err, results) {
      if(err) { console.log(err); }
      if(results && results.length) {
        res.end({status: "EXIST"});
      }
    });
  });*/
  
  const state = "XX"
  const age   = 01
  
  const query = ""
    + "INSERT INTO users "
    + "(name, pass, age, sex, country, state, birthday)"
    + "VALUES ('"+b.name+"','"+b.pass+"',"+age+",'"+b.sex+"','"+b.country+"','"+state+"','"+b.birthday+"');";

  req.getConnection(function(err, conn) {
    if(err) console.log(err);
    conn.query(query, function(err, results) {
      if(err) { 
        console.log(err);
        res.json(err); 
      }
      console.log("OK");
      res.json({status: "OK"});
    });
  });
  
});

// #
app.get("/messages", function(req, res) {
  if(!req.session.user) {
    res.end({status: "NOT LOGGED"});
  }
  
  const q = "SELECT * FROM chat";
  
  req.getConnection(function(err, conn) {
    if(err) console.log(err);
    
    conn.query(q, function(err, results) {  
    if(err) console.log(err);
      
      for(var i=0, msg; msg=results[i++];) {
        if(msg.userid == req.session.user.id) {
          msg.me = true;
        }
      }
      
      res.json(results);
      
    });
  });
  
});

app.post("/post", function(req, res) {
  if(!req.session.user) {
    res.end({status: "NOT LOGGED"});
  }
 
  const q = "INSERT INTO chat (userid, type, name, body) VALUES ("+req.session.user.id+", 'message', '"+req.session.user.name+"','"+req.body.body+"');";
  
  
  req.getConnection(function(err, conn) {
    conn.query(q, function(err, results) {
      res.json({status: "OK"});
    });
  });
  
});

/*
app.post("/image", function(req, res) {
  const img = req.files.image;
  
  res.json({name: img.name});
});*/

app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, "public", "index.html"))
});
/*
server.listen(port,'127.0.0.1',function(){
  server.close(function(){
    server.listen(8001, '45.6.103.227')
  })
})*/

app.listen(port, '0.0.0.0')
console.log("server started on port " + port);




