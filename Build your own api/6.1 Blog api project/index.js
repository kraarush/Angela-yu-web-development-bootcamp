import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const d = new Date();

//Write your code here//

//CHALLENGE 1: GET All posts
app.get('/posts', (req,res) => {
  try{
    res.status(200).send(posts); 
  }
  catch(err){
    res.status(500).json({ message: "Error fetching posts Internal Server Error" });
  }
});

//CHALLENGE2: GET post by id
app.get('/posts/:id', (req,res) => {
  try{
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if(!post){
      res.status(404).json({ message: "Post not found" });
    }
    else res.status(200).send(post);
  }
  catch(err){
    res.status(500).send("Internal server error");
  }
});

//CHALLENGE 3: POST a new post
app.post('/posts', (req,res) => {
  try{
    const data = req.body;
    console.log(data);
    var n = posts.length + 1;

    const blog = {
      id: n,
      title: data.title,
      content: data.content,
      author: data.author,
      date: d
    }
    posts.push(blog);
    res.status(200).json({message:"Blog post saved Successfully"});
  }
  catch(err){
    res.status(500).json({message: "API Error: error saving the post"});
  }
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch('/posts/:id', (req,res) => {
  try{
    const data = req.body;
    console.log(data);
    const id = parseInt(req.params.id);
    const index = posts.findIndex(blog => blog.id === id);

    if(index < 0 || index >= posts.length){
      res.status(404).json({message: "No posts found with the given id"});
    }
    else{
      const newBlog = {
        id: id,
        title: data.title || posts[index].title,
        content: data.content || posts[index].content,
        author: data.author || posts[index].author,
        date: posts[index].date
      }
      posts[index] = newBlog;
      res.status(200).json({message: "Data updated successfully"});
    }
  }
  catch(err){
    res.status(500).json({message: "API error, cannot update the data"});
  }
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete('/posts/:id', (req,res) => {
  try{
    const id = parseInt(req.params.id);
    const index = posts.findIndex(blog => blog.id === id);

    if(index < 0 || index >= posts.length){
      res.status(404).send("No posts found with the given id");
    }
    else{
      posts.splice(index,1);
      res.status(200).send("Post Deleted Successfully");
    }
  }
  catch(err){
    res.status(500).send("Internal Server error");
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});


// res.status(500).json({ message: error.response?.data?.message || "Internal Server Error" });