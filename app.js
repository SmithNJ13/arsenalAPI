const express = require("express");

const players = require("./data");
const port = 3030;
const app = express();

// setting up server
app.listen(port, () => {
    console.log("app.js listening on port: " + port)
})

// getting a response from the root page
app.get("/", (req, res) => {
    res.status(200).send(players);
    console.log("line 13: root page working");
})

// a function to get the property of the players store in data.json from the URL, keeps going until it reaches the end of the url path so /1/personal details/nationality will return /nationality
function getProperty(obj, path) {
    const properties = path.split("/");
    let value = obj; // val = obj of function which is the "foundPlayuer", ie; the element in the array in JSON file, so if /1/ is in url the 1st element of the array is assigned etc;
  
    for (const property of properties) { // for...of is used because the properties of each player are stored in an array within the JSON file so we're accessing [element] of [properties]
      value = value[property];
    }
    return value;
  }
  
  // response for each property the user enters so /2/name, /6//personal details etc;
  app.get("/:id/*", (req, res) => {
    const idx = req.params.id;
    const path = req.params[0];
    const foundPlayer = players[idx - 1]; //no-one counts starting at 0
  
    if (!foundPlayer) {
      return res.status(404).send({ message: "No such arsenal player exists" });
    }
  
    const value = getProperty(foundPlayer, path);
    if (value === undefined) {
      return res.status(404).send({ message: "Invalid property for the player" });
    }
  
    if (typeof value === "number") {
      return res.status(200).send(value.toString());
    }
    res.status(200).send(value);
  });

app.get("/:id", (req, res) => {
    console.log("line 55: ", req.params);
    const idx = req.params.id;
    const foundPlayer = players[idx -1];
    if(!foundPlayer) {
        res.status(404).send({message: "no such current arsenal player exists"});
    }
    res.status(200).send(foundPlayer);
})


// example of how I might do it incase I don't finish it, could potentially use method above with "/:id/*" and a recursive loop to get user to add specific details to a player????
app.post("/:id", (req, res) => {
  console.log("line 61: ", req.body);
  const newPlayer = req.body;
  players.push(newPlayer);
  console.log(res.status(201).send(newPlayer));
})


