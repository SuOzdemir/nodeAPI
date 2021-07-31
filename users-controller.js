const express = require('express');
const {query} = require("./db-utils");

const router = express.Router();

router.post('/user', addUser);

module.exports = router;

async function addUser(req, res, next) {
    const {email, name, metadata} = req.body;
    const dbRes = await query(`insert into users (id, email, name, metadata) values
       (default, $1, $2, $3) returning *`, [email, name, metadata]);
    console.log(dbRes.rows);
    res.status(200).json(null);
}
