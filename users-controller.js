const express = require('express');
const jwt = require('jsonwebtoken');
const {query, transactional} = require("./db-utils");
const {getHashed} = require("./utils");
const config = require('./config.json');

const router = express.Router();

router.post('/authenticate', authenticate);
router.post('/user', addUser);
router.put('/user', updateUser);
router.get('/users', getUsers);
router.get('/user', getUser);

module.exports = router;

async function authenticate(req, res, next) {
    const {email, password} = req.body;
    const dbRes = await query(
        `select * from users where email = $1 and password = $2`
        ,[email, await getHashed(password)]);
    console.log('authenticate.rows', dbRes.rows);
    if (dbRes.rows.length > 0) {
        const id = dbRes.rows[0].id;
        const token = jwt.sign({
            id,
            email,
        }, config.secret);
        const result = {
            result: true,
            user: {
                id,
                email,
                token
            }
        };
        res.status(200).json(result);
        return;
    }
    res.status(400).json({ message: 'Yanlış kullanıcı adı/parola!!' });
}

async function addUser(req, res, next) {
    const {email, name, password, metadata} = req.body;
    const dbRes = await query(`insert into users (id, email, name, password, metadata) values
       (default, $1, $2, $3, $4) returning *`, [email, name, await getHashed(password), JSON.stringify(metadata)]);
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
