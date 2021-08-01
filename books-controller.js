const express = require('express');
const {query, transactional} = require("./db-utils");

const router = express.Router();

router.post('/book', addBook);
router.put('/book', updateBook);
router.delete('/book', deleteBook);
router.get('/books', getBooks);
router.get('/book', getBook);

module.exports = router;

async function addBook(req, res, next) {
    console.log('addBook', req.body);
    const {bookName, authorName, category} = req.body;
    const dbRes = await query(`insert into books (id, book_name, author_name, category) values
       (default, $1, $2, $3) returning *`, [bookName, authorName, category]);
    res.status(200).json(null);
}

async function updateBook(req, res, next) {
    const {id,bookName, authorName, category} = req.body;
    await transactional(async qt => {
        const dbRes = await qt(`
        update books set 
           book_name = $1,
           author_name = $2,
           category = $3
        where id = $4`, [bookName, authorName, category, id]);
    });
    res.status(200).json(null);
}

async function deleteBook(req, res, next) {
    const { id } = req.query;
    await transactional(async qt => {
        const dbRes = await qt(`
        delete from  books where id = $1`, [id]);
    });
    res.status(200).json(null);
}

async function getBooks(req, res, next) {
    const dbRes = await query(`select * from books order by id`, []);
    res.status(200).json(dbRes.rows);
}

async function getBook(req, res, next) {
    const dbRes = await query(`select * from books where id = $1`, [req.query.id]);
    res.status(200).json(dbRes.rows[0]);
}
