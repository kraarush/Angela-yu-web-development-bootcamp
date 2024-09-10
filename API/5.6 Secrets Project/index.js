// HINTS:
// 1. Import express and axios
// 2. Create an express app and set the port number.
// 3. Use the public folder for static files.
// 4. When the user goes to the home page it should render the index.ejs file.
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
// 6. Listen on your predefined port and start the server.
import express from 'express';
import axios from 'axios';

const api_url = "https://secrets-api.appbrewery.com";
const port = 3000;
const app = new express();

app.use(express.static("public"));

app.get('/', async(req,res) => {
    try{
        const response = await axios.get(api_url+"/random");
        res.render("index.ejs",{
            secret: response.data.secret,
            user: response.data.username,
        });
    }
    catch(error){
        res.render("index.ejs",{
            secret: `Internal server error`,
            user: `Internal server error`,
        });
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

