const express = require('express');
const router = express.Router();


router.patch('/', function(req, res, next) {
    const collection = req.app.locals.collection.notes;
    const newNote = req.body.notes;
    const id = Number(req.body.id);
    collection.updateOne({id}, {$set: {notes : newNote} }).then(data=>res.json(data))
 })
 
 router.post('/', function(req, res, next) {
    const collection = req.app.locals.collection.notes;
    const document = req.body;
    collection.insertOne(document).then((data)=>res.json(data));
 })

 router.get('/:id', function(req, res, next) {
    const collection = req.app.locals.collection.notes;
    const id = Number(req.params.id);
    collection.findOne({id}).then(data=>res.json(data));
 })

 

 module.exports = router;