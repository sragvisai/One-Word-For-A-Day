const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const fs = require('fs');

let parsedData = [];

let foundIt =  {
  "1" : "true"
};

let notFound = {
  "1" : "false"
};

app.get("/message", (req, res) => {
    //res.json({ message: "Hello from server!" });
    res.send({"1" : parsedData[0]});
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
    console.log(typeof(data));
    parsedData = data.split("\n");
    console.log(parsedData[0]);
  });

});

app.get("/validate",(req,res) => {

  console.log("Requested word for validation ");
  let word = req.query.param1;
  console.log(word);
  if(word != null && parsedData.includes(word)){
      console.log("Found the word");
      res.send(foundIt);
  }
  else
    res.send(notFound);
});

function stringify(obj) {
  let cache = [];
  let str = JSON.stringify(obj, function(key, value) {
    if (typeof value === "object" && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null; // reset the cache
  return str;
}