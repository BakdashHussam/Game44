var http = require('http'); // Import Node.js core module
const express = require("express")
const mongo = require("mongodb").MongoClient
const app = express()
const url = "mongodb://localhost:27017"


// Connect to MongoDB
let db, credit, history

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db("game44")
    credit = db.collection("credit")
    history = db.collection("history")
      }
)


// Initialize credits
let credits = new Array();
for (i=0; i<5; i++) {
    credits[i] = 100;
}


// Variables
let gessedNumbers = new Array();
let round = 0;

// creating server
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // update to match the client domain 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.post('/', function(req, res, next) {
  res.write('<html><body><p>This is test Page.</p></body></html>');
  res.end();

});
  
// Retrive body data passed
var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({
      extended: false
  }));

// Serve request
app.post('/round', function(req, res, next) {
      round++;
      var reqData =  req;
      // Get passed data
      if (reqData.body.userGessedNumber != undefined) {
          gessedNumbers[0] = reqData.body.userGessedNumber;
      }
      else {
          gessedNumbers[0] = 0;
      }
      // Generate Computer players gessed numbers
      for (i=1; i<5; i++) {
          gessedNumbers[i] = parseInt(Math.random() * 1000 ) / 100;
      }

      // Generate secret number
      let secretNumber = parseInt(Math.random() * 1000 ) / 100;

      // Retrive current credits from MongoDB
      credit.find().toArray();


      // Calculate the round result
      for (i=0; i<5; i++) {
          if (gessedNumbers[i] < secretNumber) {
              credits[i] = credits[i] + gessedNumbers[i] * 10;
              credits[i] = Number(credits[i].toFixed(2));
          }

      }

      // store round result into History in MongoDb
      history.insertOne(
          {
          round: round,
          secretNumber: secretNumber,
          player_1_credit: credits[0],
          player_1_gessedNumber: gessedNumbers[0],
          player_2_credit: credits[1],
          player_2_gessedNumber: gessedNumbers[1],
          player_3_credit: credits[2],
          player_3_gessedNumber: gessedNumbers[2],
          player_4_credit: credits[3],
          player_4_gessedNumber: gessedNumbers[3],
          player_5_credit: credits[4],
          player_5_gessedNumber: gessedNumbers[4],
          },
      )
      // send round results
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ round: round, secretNumber: secretNumber, gessedNumbers: gessedNumbers, credits: credits}));  
      res.end();  
});

app.listen(3001);

console.log('Node.js web server is running at port 3001 ...')