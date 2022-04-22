const express = require('express');
const router = express.Router();


 router.delete('/:title', async function(req, res, next) {
   const collection = req.app.locals.collection.ratings;
   const title = req.params.title;
   await collection.deleteOne({title}).then(data=>res.json(data))
})

 router.post('/', async function(req, res, next) {
    const collection = req.app.locals.collection.ratings;
    const document = req.body;
    await collection.insertOne(document).then((data)=>res.json(data));
 })

 router.patch('/', function(req, res, next) {
   const collection = req.app.locals.collection.ratings;
   const newRate = Number(req.body.ratings);
   const id = req.body.id;
   collection.updateOne({id}, {$set: {ratings : newRate} }).then(data=>res.json(data))
})

 router.get('/:id', function(req, res, next) {
    const collection = req.app.locals.collection.ratings;
    const id = Number(req.params.id);
    collection.findOne({id}).then(data=>res.json(data));
 })

 

 module.exports = router;