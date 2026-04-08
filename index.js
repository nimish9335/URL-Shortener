const express = require('express');
const mongoose = require('mongoose');

const urlRoutes = require('./routes/url_routes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/urlshortener')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/url', urlRoutes);
app.listen(5000, () => console.log('Server running on 5000'));