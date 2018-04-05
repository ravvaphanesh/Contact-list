
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('appartmentslist', ['appartmentslist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/appartmentslist', function (req, res) {
  console.log('I received a GET request');

  db.appartmentslist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/appartmentslist', function (req, res) {
  var doc = req.body;
   var exists;
   db.appartmentslist.find({email: doc.email}, function(err,docs){
       if (docs === undefined || docs.length == 0){
           console.log("Doesn't exist" );
           exists = false;
       }
       else{
           console.log("Exists" );
           exists = true;
       }
       if(exists){}
       else{
          if(doc.email == undefined){}
          else{
                db.appartmentslist.insert(req.body, function(err, doc) {
              res.json(doc);
            });
          }
       }
   });
});

app.delete('/appartmentslist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.appartmentslist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/appartmentslist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.appartmentslist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/appartmentslist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.appartmentslist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");