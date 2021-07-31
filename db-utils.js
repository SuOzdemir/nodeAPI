const { Pool, Client } = require('pg');
const { types } = require('pg');

types.setTypeParser(20, (val) => parseInt(val));

module.exports = {
    query,
    transactional
};

const pool = new Pool({
    host: 'hattie.db.elephantsql.com',
    user: 'tvkyzojm',
    database: 'tvkyzojm',
    password: 'lsiOCQk5-6gdOUfQnvx9XrenM6qJAUiU',
    port: 5432
});

async function query(sql, params) {
    return await pool.query(sql, params);
}

async function transactional(prmFunction) {
    try {
        await query("BEGIN");
        await prmFunction(query);
        await query("COMMIT");
    } catch (e) {
        console.log(e);
        console.log("hatayla karşılaşıldı-ROLLBACK");
        await query("ROLLBACK");
        throw e;
    }
}
