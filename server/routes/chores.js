const express = require('express');
const db = require('../../database/');
const { isLoggedIn } = require('../helpers');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
  db.findAll('chores')
    .then(queryResult => res.send(queryResult))
    .catch((err) => {
      console.error(`[error ID 51] get chores: ${err}`);
    });
});

router.post('/', (req, res) => {
  db.addChore(req.body.name)
    .then((dbResponse) => {
      res.status(201).json({ choreId: dbResponse.insertId });
    })
    .catch((err) => {
      console.error(`[error ID 52] post chore ${req.body.name}: ${err}`);
    });
});

router.put('/:choreId', (req, res) => {
  db.editChore(req.params.choreId, req.body.name)
    .then(res.send(`PUT choreId ${req.params.choreId} success!`))
    .catch((err) => {
      console.error(`[error ID 53] put chore ${req.parmas.choreId}: ${err}`);
    });
});

router.delete('/:choreId', (req, res) => {
  db.deleteChore(req.params.choreId)
    .then(console.log(req.params))
    .then(res.send(`DELETED choreId ${req.params.choreId} success!`))
    .catch((err) => {
      console.error(`[error ID 54] delete chore ${req.body.name}: ${err}`);
    });
});

module.exports = router;
