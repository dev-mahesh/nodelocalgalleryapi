//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const express = require('express');
const port = 3000

//joining path of directory 
const directoryPath = path.join(__dirname, 'assets');
var images = []
const app = express();
app.use(express.static(directoryPath));
app.use('/assets', express.static(path.join(__dirname, 'assets')))

//get all images api
app.get('/', (req, res) => {
    var imgArray = []
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        console.log(files);
        
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            var newImageName = "http://localhost:3000/assets/"+ file
            imgArray.push(newImageName)
            console.log(newImageName);
        });
        console.log(imgArray)
        res.json({data: imgArray})
    });
    
})

//start server 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// function getImages(directoryPath, callback) {
//     var fileType = '.jpg',
//         files = [], i;
//     fs.readdir(imageDir, function (err, list) {
//         for(i=0; i<list.length; i++) {
//             if(path.extname(list[i]) === fileType) {
//                 files.push(list[i]); //store the file name into the array files
//             }
//         }
//         callback(err, files);
//     });
// }
