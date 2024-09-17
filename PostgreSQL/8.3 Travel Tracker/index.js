import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let visCountries = [];
var isFound = true;
var isPresent = false;
var error = "";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Angela Yu Course",
  password: "aarush",
  port: 5432,
});

db.connect();

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT visited FROM visitedcountries");
    // visCountries = result.rows.map(country => country.visited);
    var visCountries = [];
    result.rows.forEach(element => {
      visCountries.push(element.visited)
    });

    let totalCountries = visCountries.length;
    res.render("index.ejs", {
      isFound: isFound,
      isPresent: isPresent,
      error: error,
      total: totalCountries,
      countries: visCountries,
    });
  } catch (error) {
    res.status(500).send("Error fetching data from the database");
  }
});

app.post('/add', async (req,res) => {
  try{
    var country = req.body.country.toLowerCase();

    const check = await db.query("select country_code from countries where LOWER(country_name) like $1 || '%' ",[country]);
    if(check.rows.length == 0) isFound = false;
    else isFound = true;
    const code = check.rows[0].country_code;
    try{
      await db.query(`INSERT INTO visitedcountries(visited) VALUES ('${code}');`);
      isPresent = false;
    }
    catch(err){
      error = "Country already present";
      isPresent = true;
    }
    if(error.length == 0) error = "";
    res.redirect('/');
  }
  catch(err){
    error = "Country not found";
    res.status(404).redirect('/');
  }
});

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
});
