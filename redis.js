const redis = require("redis");
const { promisify } = require("util");

const subscriber = redis.createClient({url: 'redis://localhost:6379'});

const client = redis.createClient({url: 'redis://localhost:6379'});
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

client.on("error", function(error) {
    console.error(error);
});

//client.set("key", "value", redis.print);
//client.get("key", redis.print);

function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

async function test() {
    let res = await setAsync("key", "value", 'EX', 5);
    console.log(res);

    console.log('sleep start');
    await sleep(6);
    console.log('sleep end');
    res = await getAsync("key");
    console.log(res);

    /*
    res = await delAsync("key");
    console.log(res);
     */
}

async function testSubPub() {
    subscriber.on("message", (channel, message) => {
        console.log("Subscriber received message in channel '" + channel + "': " + message);
    });
    subscriber.subscribe("channel01");

    await sleep(6);

    client.publish("channel01", "a message");
}

//test();
testSubPub();
