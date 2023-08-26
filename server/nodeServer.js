const express = require("express");
const cors = require("cors");
const app = express();

const request = require('request');

app.use(cors());
app.use(express.json());

const fs = require('fs');

let parsedData = [];

let foundIt = {
  "1": "true"
};

let notFound = {
  "1": "false"
};

app.get("/message", (req, res) => {
  //res.json({ message: "Hello from server!" });
  let randomIndex = Math.floor(Math.random() * 5757);
  let word = parsedData[randomIndex];
  let hint;
  console.log("Word for the day "+word);
  request.get({
    url: ' https://api.dictionaryapi.dev/api/v2/entries/en/' + word,
  }, function (error, response, body) {
    if (error) return console.error('Request failed:', error);
    else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    else {
      body = JSON.parse(body);
      console.log(body[0].meanings[0].partOfSpeech);
      console.log(body[0].meanings[0].definitions[0].definition);
      hint = {
        "pos" : body[0].meanings[0].partOfSpeech,
        "def" : body[0].meanings[0].definitions[0].definition
      }
      res.send({ "1": word , "2" : hint});
    }
  })
  
  //res.send(message);
});


app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
  //read the file and store the info in a json object

  fs.readFile('./words.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(typeof (data));
    parsedData = data.split("\n");
    console.log(parsedData[0]);
  });

});

app.get("/validate", (req, res) => {

  console.log("Requested word for validation ");
  let word = req.query.param1;
  console.log(word);
  if (word != null && parsedData.includes(word)) {
    console.log("Found the word");
    res.send(foundIt);
  }
  else
    res.send(notFound);
});
