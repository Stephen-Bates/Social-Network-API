const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  removeThought,
  createReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).post(updateThought).delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId').post(createReaction).delete(removeReaction);

module.exports = router;
