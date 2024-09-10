import express from "express";
import { dirname } from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(bodyParser.urlencoded({extended:true}));

app.post("/submit",(req,res) => {
  var street = req.body.street;
  var pet = req.body.pet;
  console.log(`The street name entered is ${street} and the pet name is ${pet}`);
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
