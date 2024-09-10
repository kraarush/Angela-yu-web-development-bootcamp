/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
// var qr = require('qr-image');
// var inquirer = require('inquirer');

import qr from 'qr-image';
import inquirer from 'inquirer';
import fs from 'fs';

inquirer
    .prompt([
        {
            message: "Type your url: ",
            name: "URL"
        }
    ])
    .then((answers) => {
        var url = answers.URL;
        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream('qr.png'));

    })