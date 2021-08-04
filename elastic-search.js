const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' })

async function test() {
    const { body } = await client.sql.query({
        body: {
            query: `SELECT * FROM dene02 WHERE adi='Ali'`
        }
    })
    console.log(body);
    /*
    const res = await client.ping();
    console.log('res', res);

    const res = await client.indices.get({
        index: 'dene02'
    });

    const res = await client.indices.create({
        index: 'dene02'
    });

    const res = await client.index({
        index: 'dene01',
        body: {
            id: 1,
            adi: 'Ali'
        }
    });
    console.log(res);
    const result = await client.search({
        index: 'dene01',
        body: {
            query: {
                match: { id: 1 }
            }
        }
    });
    console.log(result.body.hits.hits);

    const result = await client.search({
        index: 'dene02',
        body: {
            query: {
                match_phrase_prefix: { adi: 'a' }
            }
        }
    });
    console.log(result.body.hits.hits);

    const { body } = await client.sql.query({
        body: {
            query: `SELECT * FROM dene02 WHERE adi='Ali'`
        }
    })
    console.log(body);
     */
}

test();
