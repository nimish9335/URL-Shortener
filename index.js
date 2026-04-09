const express = require('express');
const mongoose = require('mongoose');
const URL = require('./models/URL_Schema');
const staticRoutes = require('./routes/static_routes');
const path=require('path');

const urlRoutes = require('./routes/url_routes');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/urlshortener')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/',staticRoutes);

// Routes
app.use('/url', urlRoutes);
app.listen(5000, () => console.log('Server running on 5000'));