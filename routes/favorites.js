const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
    const collection = req.app.locals.collection.favorites;
    collection.find({})
    .toArray()
    .then(data => res.json(data))
 });
 
 router.post('/', function(req, res, next) {
    const collection = req.app.locals.collection.favorites;
    const document = req.body;
    collection.insertOne(document).then((data)=>res.json(data));
 })

 router.get('/:id', function(req, res, next) {
    const collection = req.app.locals.collection.favorites;
    const id = Number(req.params.id)
    collection.findOne({id}).then(data=>res.json(data));
 })

 router.delete('/:id', function(req, res, next) {
    const collection = req.app.locals.collection.favorites;
    const id = Number(req.params.id)
    collection.deleteOne({id}).then(data=>res.json(data))
 })

 module.exports = router;