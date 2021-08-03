const express = require('express');

const { client } = require('./mongo-utils');

const router = express.Router();

router.post('/dene', dene);

module.exports = router;

async function dene(req, res, next) {
    let result = {result: true};
    const {db, coll, createCollection, insertOne, insertMany, find} = req.body;
    if (createCollection) {
        //const res = await client.db(db).collection(createCollection.name);
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
        //    "find": { "name" : { "$exists" : true, "$ne" : null } }
        result = await collection.find( find ).toArray();
    }

    res.status(200).json(result);
}

