import express from 'express';
import pg from 'pg';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;
const api_url = "https://openlibrary.org/dev/docs/api/covers";

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Bookstore_Capstone_Project",
  password: "aarush",
  port: 5432,
});
db.connect();

const fixedData = [
  {
    "id": 1,
    "title": "Gulliver's Travels",
    "author": "Jonathan Swift",
    "rating": 4,
    "content": "Gulliver's Travels is a satirical novel by Jonathan Swift that critiques human nature and society through the adventures of Lemuel Gulliver. After shipwrecking on strange lands, Gulliver encounters the tiny Lilliputians, the giant Brobdingnagians, and other bizarre cultures. Each society reflects various aspects of 18th-century politics, morality, and human behavior, revealing the absurdities of both the characters and their customs. Swift's sharp wit and clever storytelling expose the follies of humanity, making the book not only an entertaining read but also a thought-provoking commentary on the human condition, power, and the nature of civilization."
  },
  {
    "id": 2,
    "title": "The Diary of a Young Girl",
    "author": "Anne Frank",
    "rating": 5,
    "content": "The Diary of a Young Girl is the poignant and powerful account of Anne Frank, a Jewish teenager who went into hiding during World War II. Through her diary, Anne shares her thoughts, fears, and dreams as she navigates the challenges of adolescence while living in fear of discovery. Her writing captures the complexities of growing up in a time of persecution and war, offering a unique perspective on the human spirit's resilience. Anne's reflections on identity, family, and hope resonate deeply, making her diary an enduring testament to the struggles of the human experience."
  },
  {
    "id": 3,
    "title": "The Boy in the Striped Pajamas",
    "author": "John Boyne",
    "rating": 5,
    "content": "The Boy in the Striped Pajamas is a heart-wrenching tale of innocence and friendship set during World War II. It follows the story of Bruno, an eight-year-old boy whose father is a commandant at a concentration camp. Moving to a new home near the camp, Bruno befriends a boy named Shmuel, who wears striped pajamas and lives on the other side of the fence. Their friendship transcends the horrors of their surroundings, highlighting the tragic consequences of prejudice and hatred. Through Bruno's naive perspective, the novel powerfully illustrates the impact of war on humanity and the innocence of childhood."
  }
  ,
  {
    "id": 4,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "rating": 4,
    "content": "The Great Gatsby is a classic novel by F. Scott Fitzgerald that captures the essence of the American Dream during the Roaring Twenties. Through the eyes of Nick Carraway, readers witness the lavish lifestyle and tragic downfall of Jay Gatsby, a mysterious millionaire driven by his love for Daisy Buchanan. The novel explores themes of wealth, love, and disillusionment, offering a critical look at the pursuit of happiness and the moral decay underlying the era's glamour."
  },
  {
    "id": 5,
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "rating": 5,
    "content": "Pride and Prejudice is a beloved novel by Jane Austen that explores themes of love, class, and individuality in early 19th-century England. The story follows Elizabeth Bennet, a strong-willed young woman navigating societal expectations and her complex relationship with the enigmatic Mr. Darcy. Austen's witty prose and sharp social commentary illuminate the nuances of human relationships, making the novel a timeless exploration of romance and personal growth."
  }
]

let dataLength = 0;

async function getData() {
  try {
    const result = await db.query("Select * from books");
    const data = result.rows;
    dataLength = data.length;
    return data;
  }
  catch (err) {
    console.log(err);
  }
}

async function getDataById(id){
  try{
    const result = await db.query("Select * from books where id = $1", [id]);
    const data = result.rows[0];
    return data;
  }
  catch(err){
    console.log("Error in getDataById" + err);
  }
}

app.get('/', async (req, res) => {
  try {
    let data = await getData();
    let demoData = false;

    if(data.length == 0){
      data = fixedData;
      demoData = true;
    } 
    res.render("index.ejs", { bookData: data , demoData: demoData});
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Internal Server error fetching the index.ejs file");
  }
});

app.get('/add', (req, res) => {
  try {
    res.status(200).render('addReview.ejs');
  }
  catch (err) {
    res.status(500).send("Internal Server error fetching the addReview.ejs file");
  }
});

app.get('/edit/:id', async(req,res) => {
  try {
    const id = parseInt(req.params.id);
    let data = [];
    if(dataLength != 0) {
      data = await getDataById(id);
    }
    else{                                                       
      const index = fixedData.findIndex(i => i.id === id);
      data = fixedData[index];
    }
    res.status(200).render('editReview.ejs',{bookData: data});
  }
  catch (err) {
    res.status(500).send("Internal Server error fetching the editReview.ejs file");
  }
});

app.post('/addReview', async (req, res) => {
  try {
    const title = req.body.title;
    const author = req.body.author;
    const rating = req.body.rating;
    const content = req.body.content;

    if (title && author && rating && content) {
      const result = await db.query("insert into books(title,author,rating,content) values($1,$2,$3,$4) returning *", [title, author, rating,content]);
      res.redirect('/');
    }
    else{
      res.render('addReview.ejs', {message: "Enter all values to proceed"});
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ type: 'Internal server error', message: 'Error inserting into database' });
  }
});

app.post('/editReview/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await getDataById(id);
    const title = req.body.title || data.title;
    const author = req.body.author || data.author;
    const rating = req.body.rating || data.rating;
    const content = req.body.content || data.content;

    if(dataLength != 0){
      await db.query("UPDATE books SET title = $1, author = $2, rating = $3, content = $4 WHERE id = $5", [title, author, rating, content, id]);
    }
    else{
      const index = fixedData.findIndex(i => i.id === id);
      fixedData[index].title = title;
      fixedData[index].author = author;
      fixedData[index].rating = rating;
      fixedData[index].content = content;
    }

    res.redirect('/');
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ type: 'Internal server error', message: 'Error updating database' });
  }
});

app.get('/delete/:id', async(req,res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(id);

    if(dataLength != 0){
      await db.query("DELETE FROM books WHERE id = $1", [id]);
    }
    else{
      const index = fixedData.findIndex(i => i.id === id);
      fixedData.splice(index,1);
    }

    res.status(200).redirect('/');
  }
  catch(err){
    res.status(500).send("Error deleting the data");    
  }
})

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});