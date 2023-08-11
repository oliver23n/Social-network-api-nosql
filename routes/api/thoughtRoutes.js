const router = require('express').Router();
const {
    getThoughts,
    getSingle,
    updateThought,
    deleteThought,
    createThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

//api/thoughts
router.route('/').get(getThoughts).post(createThought)

//api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingle).put(updateThought).delete(deleteThought)
//api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction)
module.exports = router;