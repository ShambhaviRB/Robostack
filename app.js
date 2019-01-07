const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const user = require('./routes/user');
const query = require('./routes/query');

const app = express();

mongoose.promise = global.promise;
mongoose.connect('mongodb://localhost:27017/Robostack', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/users', user);
app.use('/queries', query);

let port = 3000;

app.listen(port, () => {
    console.log("server up and running in port ",port);
});