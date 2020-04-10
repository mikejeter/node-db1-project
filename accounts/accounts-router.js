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
const accountData = req.body;
	db('accounts')
    .insert(accountData)
    .then(account => res.status(200).json(account))
    .catch(err => res.status(500).json({  message: "failed to create new account", err}));
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db('accounts')
    .where({id})
    .update(changes)
    .then(count => {
        if (count) {
            res.json({ updated: count});
        } else {
            res.status(404).json({ message: "invalid id"});
        }
    })
    .catch(err => res.status(500).json({ message: "error updating", err}));
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db('accounts')
    .where({id})
    .del()
    .then(count => {
        if (count) {
            res.json({ updated: count});
        } else {
            res.status(404).json({ message: "invalid id"});
        }
    })
    .catch(err => res.status(500).json({ message: "error updating", err}));
});

module.exports = router;