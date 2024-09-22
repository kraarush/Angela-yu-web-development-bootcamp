import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Angela Yu Course",
  password: "aarush",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let error = "";
let currentUserId = 1;
let totalUsers = [];
let color = "";

async function checkVisited() {
  let countries = [];
  const result = await db.query("select users.id, users.name, users.color,visited from users join visitedcountries on users.id = visitedcountries.userid where userid = $1;", [currentUserId]);
  if (result.rows.length > 0) {
    result.rows.forEach((user) => {
      countries.push(user.visited);
    });
    color = result.rows[0].color;
  }
  else {
    error = "No visited countries found";
    color = 'teal';
  }
  return countries;
}

async function getUsers() {
  const res = await db.query("select * from users");
  totalUsers = res.rows;
}

app.get("/", async (req, res) => {
  await getUsers();
  let countries = await checkVisited();

  res.render("index.ejs", {
    countries: countries,
    error: error,
    total: countries.length,
    users: totalUsers,
    color: color
  });
});

app.post("/add", async (req, res) => {
  try {
    var country = req.body.country.toLowerCase();
    const check = await db.query("select country_code from countries where LOWER(country_name) like $1 || '%' ", [country]);

    const code = check.rows[0].country_code;
    try {
      await db.query("INSERT INTO visitedcountries(visited,userid) VALUES ($1,$2)", [code, currentUserId]);
    }
    catch (err) {
      error = "Country already present";
    }
    res.redirect('/');
  }
  catch (err) {
    error = "Country not found";
    res.status(404).redirect('/');
  }
});

app.post("/user", async (req, res) => {
  const name = req.body.add;
  currentUserId = req.body.user;

  if (name === 'new') {
    res.render('new.ejs');
  }
  else {
    res.redirect('/');
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  const name = req.body.name;
  const color = req.body.color;
  await db.query("insert into users(name,color) values ($1,$2)", [name, color]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});