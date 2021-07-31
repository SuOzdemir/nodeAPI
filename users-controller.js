const express = require('express');
const {query, transactional} = require("./db-utils");

const router = express.Router();

router.post('/user', addUser);
router.put('/user', updateUser);
router.get('/users', getUsers);
router.get('/user', getUser);

module.exports = router;

async function addUser(req, res, next) {
    const {email, name, metadata} = req.body;
    const dbRes = await query(`insert into users (id, email, name, metadata) values
       (default, $1, $2, $3) returning *`, [email, name, metadata]);
    res.status(200).json(null);
}

async function updateUser(req, res, next) {
    const {id, email, name, metadata} = req.body;
    await transactional(async qt => {
        const dbRes = await qt(`
        update users set 
           email = $1,
           name = $2,
           metadata = $3
        where id = $4`, [email, name, metadata, id]);
    });
    res.status(200).json(null);
}

async function getUsers(req, res, next) {
    const dbRes = await query(`select * from users order by id`, []);
    res.status(200).json(dbRes.rows);
}

async function getUser(req, res, next) {
    const dbRes = await query(`select * from users where id = $1`, [req.query.id]);
    res.status(200).json(dbRes.rows[0]);
}
