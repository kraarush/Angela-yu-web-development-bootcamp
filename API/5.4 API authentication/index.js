import express from "express";
import axios from "axios";

const app = express();
const port = 4000;
const API_URL = "https://secrets-api.appbrewery.com/";


//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Aarush";
const yourPassword = "aarush123";
const yourAPIKey = "648b617a-f795-483b-952d-77a98e2e3314";
const yourBearerToken = "b0a9bc48-e27f-4f29-8373-1e6abb004c6c";


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  
  const response = await axios.get("https://secrets-api.appbrewery.com/random");
  const result = response.data;
  console.log(result);

  res.render("index.ejs",{content: result});
});

app.get("/basicAuth", async(req, res) => {

    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2",{
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = response.data;
    console.log(result);
    res.render("index.ejs", {content: result});
});

app.get("/apiKey", async (req, res) => {

  // const url = `${API_URL}filter?score=5&apiKey=${yourAPIKey}`;
  // const response = await axios.get(url);

  const response = await axios.get(API_URL + "filter", {
    params: {
      score: 5,
      apiKey: yourAPIKey,
    },
  });

  const result = response.data;
  console.log(result);
  res.render("index.ejs", {content: result});

});

app.get("/bearerToken", async (req, res) => {

  const url = `${API_URL}secrets/1`;
  const response = await axios.get(url,{
    headers: {
      "Authorization" :`Bearer ${yourBearerToken}`
    }
  });
  const result = response.data;
  console.log(result);
  res.render("index.ejs", {content: result});

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
