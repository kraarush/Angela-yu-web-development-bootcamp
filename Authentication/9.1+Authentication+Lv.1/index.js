import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'secrets',
  password: 'aarush',
  port: 5432
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {

  try {
    const email = req.body.username;
    const password = req.body.password;

    const checkUser = await db.query("Select * from users where email = $1", [email]);

    if (checkUser.rows.length > 0) {
      res.status(400).render('register.ejs', { ifExist: true });
    }
    else {
      const result = await db.query("insert into users(email,password) values($1,$2) returning *", [email, password]);
      res.status(200).redirect('/login');
    }
  }
  catch (err) {
    console.log(err);
    res.send("Internal server error while saving the authentication data in database" + err);
  }

});

app.post("/login", async (req, res) => {

  try {
    const email = req.body.username;
    const password = req.body.password;

    const checkUser = await db.query("Select * from users where email = $1", [email]);

    if (checkUser.rows.length == 0) {
      res.status(404).render('login.ejs', { ifExist: false });
    }
    else {
      if(checkUser.rows[0].password === password){
        res.status(200).render('secrets.ejs');
      }
      else{
        res.status(401).render('login.ejs', { isCorrect: false });
      }
    }
  }
  catch (err) {
    console.log(err);
    res.send("Internal server error while saving the authentication data in database" + err);
  }

});

app.listen(port, async () => {
  await db.connect();
  console.log(`Server running on port ${port}`);
});
