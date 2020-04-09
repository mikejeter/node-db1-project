const express = require('express');

// database access using knex
const db = require('../data/dbconfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    // db.select().from('posts')
        db('accounts')
        .then(accounts => {
            res.json(accounts);
        })
        .catch(err => {
            res.status(500).json({message: "Error retreiving accounts", err});
        });
});

    router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.select()
    .from('accounts')
    .where({ id })
    .then(account => res.status(200).json(account))
    .catch(err => res.status(500).json({  message: err.message }));
});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;