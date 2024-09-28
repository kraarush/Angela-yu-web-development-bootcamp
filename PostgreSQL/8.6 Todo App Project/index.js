import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "aarush",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getItems() {
  let items = [];
  const result = await db.query("Select * from items");
  items = result.rows;
  return items;
}

app.get("/", async (req, res) => {
  const items = await (getItems());
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  console.log(item);
  await db.query("insert into items(title) values ($1)", [item]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  try {
    const id = req.body.updatedItemId;
    const title = req.body.updatedItemTitle;
    await db.query("update items set title = $1 where id = $2", [title, id]);
    res.redirect("/");
  }
  catch (err) {
    res.status(500).send("Unable to update data, Internal server Error");
  }
});

app.post("/delete", async (req, res) => {
  try {
    const id = req.body.deleteItemId;
    await db.query("delete from items where id = $1", [id]);
    res.redirect("/");
  }
  catch (err) {
    res.status(500).send("Error deleting the data, Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
