let http = require('http');
let port = process.env.PORT || 1337;
let hostname = '127.0.0.1';
const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const { create } = require('domain');
const fs = require("fs");
app.set('view enjine', 'ejs');
const createPath = (page) => path.resolve(__dirname, '../../Page1', `${page}.ejs`);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('../../Page1'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.post('/formData', (req, res) => {
    let formData = req.body.arr;
    fs.writeFileSync("CitiesOld.txt", formData);
    let sortData =[];
    formData = formData.split(", ")
    formData.forEach(element => {
        element = element[0].toUpperCase() + element.slice(1);
        if (element.indexOf('-') != -1) {
            let i = element.indexOf('-') + 1;
            element = element.slice(0, i) + element[i].toUpperCase() + element.slice(i+1);
        }
        sortData.push(element);
    });
    sortData.sort();
    console.log(sortData);
    formData = sortData.toString();
    fs.writeFileSync("Cities.txt", formData);
    res.render(createPath('html/lab7fs'));
})

app.get('/', (req, res) => {
    // console.log(req.session.key[req.sessionID].login);
    // req.session.views = (req.session.views || 0) + 1;
    //console.log(req.session.views + ' views');
    res.render(createPath('html/lab7fs'));
});

app.get('/getOldCities', (req, res) => {
    let Cities = fs.readFileSync("CitiesOld.txt", "utf8");
    Cities = Cities.split(", ");
    for (let i = 0; i < Cities.length; i++) {
        Cities[i] = '<li>' + Cities[i] + '</li>';
        console.log(Cities[i]);
    }
    console.log(Cities);
    Cities = Cities.toString();
    Cities = Cities.replaceAll(',', "");
    console.log(Cities);
    res.send(Cities);
});
app.get('/getNewCities', (req, res) => {
    let Cities = fs.readFileSync("Cities.txt", "utf8");
    Cities = Cities.split(",");
    for (let i = 0; i < Cities.length; i++) {
        Cities[i] = '<li>' + Cities[i] + '</li>'; 
    }
    Cities = Cities.toString();
    Cities = Cities.replaceAll(',',"");
    console.log(Cities);
    res.send(Cities);
})
app.listen(port, (error) => {
    console.log(`Server running at http://${hostname}:${port}/`);
    error ? console.log(error) : console.log('listenung');
});