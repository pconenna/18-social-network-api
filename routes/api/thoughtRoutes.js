const router = require('express').Router();
const{
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController')
router.route('/').get(getAllThoughts).post(createThought)
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction)

module.exports = router;