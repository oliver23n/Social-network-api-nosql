const router = require('express').Router();
const {
    getThoughts,
    getSingle,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController')

//api/thoughts
router.route('/').get(getThoughts)

//api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingle).put(updateThought).delete(deleteThought)
module.exports = router;