/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';


inquirer
  .prompt([{
   
    name: 'URL',
    message: 'Enter the URL you want to generate a QR code for:',
  },

  ])
  .then((answers) => {
   var url = answers.URL;
   var qr_svg = qr.image(url);
   qr_svg.pipe(fs.createWriteStream('qrImage.png'));

   fs.writeFile('qrImage.txt', "url", (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  }); })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
