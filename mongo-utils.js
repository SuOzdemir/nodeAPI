const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';


// const url = "mongodb+srv://dbUser:1q2w3e@cluster0.uy9m3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(url);

async function connect() {
    await client.connect();
    console.log('connected MongoDB..');
}

module.exports = { client };

connect();
