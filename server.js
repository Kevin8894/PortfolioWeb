var express = require("express");
server = express();


var bodyParser = require("body-parser");
var formidable = require("formidable");
var fs = require("fs");
var sizeOf = require('image-size');

var Datastore = require('nedb');
var Works = new Datastore({ filename: __dirname + '/data/Works.db', autoload: true });


server.use(express.static('Portfolio'));//web root
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.text({ type: 'text/html' }));
server.use(bodyParser.json({ type: 'application/*+json' }));

server.set("view engine", "ejs");
server.set("views", __dirname + "/views");


server.post("/upload", function (req, res) {
  var form = formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.render("error", { error: "Cannot read uploaded image file.", next: "javascript:history.back()" });
    } else {
      Works.find({ "title": fields.title }, function (err, doc) {
        if (err) {
          res.render("error", { error: "Your work'title is duplicate with database", next: "javascript:history.back()" });
        } else {
          if (doc.length == 0) {
            var gotField = fields;
            var fileExt = files.poster.name.split(".")[1];
            if (fileExt.toLowerCase() != "jpg") {
              res.render("error", { error: "Please Use .jpg image file.", next: "javascript:history.back()" });
            } else {
              gotField.poster = gotField.title + "." + fileExt;
              var posterPath = "Portfolio/upload/" + gotField.poster;
              fs.renameSync(files.poster.path, posterPath);
              Works.insert(gotField);
              res.render("success");
            }
          } else {
            res.render("error", { error: "Please Change your work'title!", next: "javascript:history.back()" });
          }
        }
      })
    }
  })
});

server.post("/remove", function (req, res) {
  var removetitle = req.body.title;
  Works.find({ "title": removetitle }, function (err, doc) {
    if (err == null && doc.length != 0) {
      var path = "Portfolio/upload/"+ doc[0].poster;
      fs.unlink(path, function () {
        console.log('已經刪除檔案!');
    });
      Works.remove({"title": removetitle}, (err,ret)=>{
        if(err==null){
          res.render("success");
        }else{
          res.render("error", { error: "Can't Find this Name!", next: "javascript:history.back()" });
        }
      });
    }else{
      res.render("error", { error: "Can't Find this Name!", next: "javascript:history.back()" });
    }
  })

});

server.post("/Character", function (req, res) {
  Works.find({ "category": "Character" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
    }
  });
});

server.post("/Scence", function (req, res) {
  Works.find({ "category": "Scence" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
    }
  });
});

server.post("/2DAnimation", function (req, res) {
  Works.find({ "category": "2DAnimation" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
      // res.render("2DAnimation", { work: result });
    }
  });
});

server.post("/3DAnimation", function (req, res) {
  Works.find({ "category": "3DAnimation" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
    }
  });
});

server.post("/Sketching", function (req, res) {
  Works.find({ "category": "Sketching" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
    }
  });
});

server.post("/DigitalArt", function (req, res) {
  Works.find({ "category": "Digital Art" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
    }
  });
});

server.post("/Painting", function (req, res) {
  Works.find({ "category": "Painting" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
    }
  });
});

server.post("/Game", function (req, res) {
  Works.find({ "category": "PC Game" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
    }
  });
});

server.post("/Microfilm", function (req, res) {
  Works.find({ "category": "Microfilm" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
    }
  });
});

server.post("/PuppetAnimation", function (req, res) {
  Works.find({ "category": "Puppet Animation" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
    }
  });
});

server.post("/Dubbing", function (req, res) {
  Works.find({ "category": "Dubbing" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
    }
  });
});

server.post("/Time-Lapse", function (req, res) {
  Works.find({ "category": "Time-Lapse" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
    }
  });
});

server.post("/Photograph", function (req, res) {
  Works.find({ "category": "Photograph" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
    }
  });
});

server.post("/Handcraft", function (req, res) {
  Works.find({ "category": "Handcraft" }, function (err, result) {
    if (err == null) {
      res.send({ work: result });
    }
  });
});



server.get("*", function (req, res) {
  res.send("Page not found", 404);
})

server.listen(8080);
console.log("Server running on port: 8080")
