const { MongoClient } = require('mongodb');
/*
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
*/



const uri = "mongodb+srv://dbUser:1q2w3e@cluster0.uy9m3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    await client.connect();
    console.log('connected MongoDB..');
}

module.exports = { client };

connect();
