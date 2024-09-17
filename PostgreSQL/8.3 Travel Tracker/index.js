import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let visCountries = [];

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Angela Yu Course",
  password: "aarush",
  port: 5432,
});

async function connectDB() {
  await db.connect();
}

async function getTable() {
  try {
    const result = await db.query("SELECT visited FROM visitedcountries");
    visCountries = result.rows.map(country => country.visited);
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

app.get("/", async (req, res) => {
  try {
    await getTable();
    console.log(visCountries);

    let totalCountries = visCountries.length;
    res.render("index.ejs", {
      total: totalCountries,
      countries: visCountries,
    });
  } catch (error) {
    res.status(500).send("Error fetching data from the database");
  }
});

app.post('/add', async (req,res) => {
  try{
    const code = req.body.country.toUpperCase();;
    const query = `INSERT INTO visitedcountries(visited) VALUES ('${code}');`;
    const result = await db.query(query);
    res.redirect('/');
  }
  catch(err){
    console.log(err);
  }
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${port}`);
});
