const express = require('express');
const { completeChore, getAllCompletedChores, clearAllChores, deleteCompleted } = require('../../database');

const router = express.Router();

router.get('/', (req, res) => {
  getAllCompletedChores()
    .then(rows => res.status(200).json(rows))
    .catch(err => console.error(`[error ID 61] GET calendar ${err}`));
});

// Using UTC day of week
router.post('/', (req, res) => {
  const { choreId, userId, day } = req.body;
  if (day < 0 || day > 6) {
    res.status(400).send('[error] expecting key:value pair for key "day" to have a "value" 0 - 6');
  } else {
    completeChore(userId, choreId, day)
      .then(res.status(201).send())
      .catch(err => console.error(`[error ID 62] POST calendar ${err}`));
  }
});

// Delete a completed chore
router.delete('/:completedChoreId', (req, res) => {
  deleteCompleted(req.params.completedChoreId)
    .then(console.log(req.params))
    .then(res.send(`DELETED completedChoreId ${req.params.completedChoreId} success!`))
    .catch((err) => {
      console.error(`[error ID 64] delete completedChore: ${err}`);
    });
});

// Delete all completed chores
router.delete('/', (req, res) => {
  clearAllChores()
    .then(res.status(200).send())
    .catch(err => console.error(`[error ID 63] DELETE calendar ${err}`));
});

module.exports = router;
