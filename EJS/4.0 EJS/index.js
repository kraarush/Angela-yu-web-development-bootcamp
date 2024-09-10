import express from "express";

const app = express();
const port = 3000;

app.get('/', (req,res) => {
    const d = new Date();
    var day = d.getDay();
    
    var currentDay = "";
    if(day === 0 || day == 6){
        currentDay = "Hey! its the weekend its time to have fun";
    }
    else currentDay = "Hey its a weekday its time to work hard";

    res.render("index.ejs",{
        name : currentDay
    });
});

app.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});