const express = require('express');
const { client } = require('./mongo-utils');

const router = express.Router();
module.exports = router;

router.post('/dene', dene);

async function dene(req, res, next) {
    let result = {result: true};
    const {db, coll, createCollection, insertOne, insertMany, find} = req.body;
    if (createCollection) {
        const res = await client.db(db).createCollection(createCollection.name);
        console.log('createCollection', res);
    }
    const collection = client.db(db).collection(coll);
    if (insertOne) {
        await collection.insertOne( insertOne );
    }
    if (insertMany) {
        await collection.insertMany( insertMany );
    }

    if (find) {
        result = await collection.find( find ).toArray();
    }

    res.status(200).json(result);
}

