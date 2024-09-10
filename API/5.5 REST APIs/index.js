import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
const API_URL = "https://secrets-api.appbrewery.com";
const yourBearerToken = "c29575b6-425c-4311-9fdf-a3326022dc41";

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  const Score = req.body.score;
  const Secret = req.body.secret;

  const data = {
    score: Score,
    secret: Secret
  } 

  try{
    const result = await axios.post(API_URL +"/secrets",data,config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  }
  catch(error){
    res.render("index.ejs", {content: JSON.stringify(error.response.data)});
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  const Score = req.body.score;
  const Secret = req.body.secret;

  const data = {
    score: Score,
    secret: Secret
  };

  try{
    const result = await axios.put(API_URL+"/secrets/"+searchId,data,config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  }
  catch(error){
    res.render("index.ejs",{content: JSON.stringify(error.response.data)});
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  const Score = req.body.score;
  const Secret = req.body.secret;

  const data = {
    score: Score,
    secret: Secret
  };
  console.log(data);

  try{
    const result = await axios.patch(API_URL+"/secrets/"+searchId,data,config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  }
  catch(error){
    res.render("index.ejs",{content: JSON.stringify(error.response.data)});
  }

});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  try{
    const result = await axios.delete(API_URL+"/secrets/"+searchId,config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  }
  catch(error){
    res.render("index.ejs",{content: JSON.stringify(error.response.data)});
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
