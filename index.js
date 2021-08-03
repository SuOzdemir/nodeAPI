const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require('./_helpers/jwt');

const {sil, getItems, getItem, ekle, guncelle} = require("./in-memory-db");

const app = express();
app.use(cors());
app.use(jwt());
app.use(bodyParser.json());

app.use('/users', require('./users-controller'));
app.use('/books', require('./books-controller'));
app.use('/mongoDB',  require('./mongo-dene-controller'));

app.get('/get-item', (req, res) => {
    const item = getItem(Number(req.query.id));
    console.log(item);
    res.send(item);
});

app.get('/get-items', (req, res) => {
    const items = getItems();
    console.log(items);
    res.send(items);
});

app.post('/add-item', (req, res) => {
    ekle(req.body);
    res.send({status: true});
});

app.delete('/delete-item', (req, res) => {
    console.log('req.body', req.body);
    sil(req.body);
    res.send({status: true});
});

app.put('/update-item', (req, res) => {
    guncelle(req.body);
    res.send({status: true});
});

app.listen(5000);
