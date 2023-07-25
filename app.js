const express = require("express");

const players = require("./data");
const port = 3030;
const app = express();

app.listen(port, () => {
    console.log("app.js listening on port: " + port)
})

app.get("/", (req, res) => {
    res.status(200).send(players);
    console.log("line 13: root page working");
})

app.get("/:id", (req, res) => {
    console.log("line 17: ", req.params);
    const idx = req.params.id;
    const foundPlayer = players[idx -1];
    if(!foundPlayer) {
        res.status(404).send({message: "no such current arsenal player exists"});
    }
    res.status(200).send(foundPlayer);
})


// !!! more testing code?
// app.get("/:id/age", (req, res) => {
//     console.log("line 27: getting player age");
//     const age = (data => {
//         data.players.age;
//     })
//     console.log(res.send(age));
// })


// !! testing code?
// app.get("/players", (req, res) => {
//     console.log("line 12: response!");
//     const paramsID = req.params.id;
//     const idx = req.params.id;
//     const foundPlayer = players.find(player => player.id === Number(paramsID))
//     res.status(200).send(players[idx]);
//     console.log(foundPlayer);
// })

