const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const indexRouter = require('./index');
const favoritesRouter = require('./routes/favorites');
const ratingsRouter = require('./routes/ratings');
const notesRouter = require('./routes/notes');

const app = express();
app.use(cors({origin: '*'}));
app.use(bodyParser.json())

const uri = "mongodb+srv://ShowCollection:alltimeclassics@cluster0.13cuh.mongodb.net/Shows?retryWrites=true&w=majority";

MongoClient.connect(uri, (err, client)=>{
    if(err) console.log('error: ', err)
    const db = client.db('Shows');
    const favorites = db.collection('Favorites')
    const notes = db.collection('Notes')
    const ratings = db.collection('Ratings')
    app.locals.collection = {favorites, ratings, notes};
})

app.use('/', indexRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/favorites', favoritesRouter);
app.use('/ratings', ratingsRouter);
app.use('/notes', notesRouter);

module.exports = app;
