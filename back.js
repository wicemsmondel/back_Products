
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const dbFile = 'test.db';
const db = new sqlite3.Database(dbFile);

const app = express();
app.use(cors());

db.serialize(() => {

    if (!fs.existsSync(dbFile)) {
        db.run('CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price INTEGER, image TEXT, like BOOLEAN)');
    }
    db.run('INSERT INTO products (name, price, image, like) VALUES (?, ?, ?, ?)', 'bag', 39, 'img/bag.png', true);
    db.run('INSERT INTO products (name, price, image, like) VALUES (?, ?, ?, ?)', 't-shirt', 15, 'img/tshirt.png', false);
    db.run('INSERT INTO products (name, price, image, like) VALUES (?, ?, ?, ?)', 'shoes', 59, 'img/shoes.png', false);

    db.all('SELECT * FROM products', function (error, data) {
        if (!error) console.log(data);
        else console.log(error);
    });
});







app.get('/', function (request, response) {
    // response.send('Hello World');
    db.all('SELECT * FROM products', function (error, data) {
        response.send(data);
    });
});

app.get('/planet', function (request, response) {
    response.send('Hello Planet');
});

app.listen(3000, function (error) {
    if (!error) console.log('app listening port 3000');
});

