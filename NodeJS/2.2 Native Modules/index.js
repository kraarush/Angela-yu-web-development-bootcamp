const fs = require('fs');

fs.writeFile("message.txt","Hello from Aarush!!", (err) => {
    if(err){
        console.log("Error writing the file: " + err);
    }
    console.log("File written successfully :)");
});


fs.readFile("message.txt","utf-8",(err,data) => {
    if(err){
        console.log("Error reading the file: " + err);
    }
    console.log("File data is: " + data);
});