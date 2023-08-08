const Thought = require('../models/Thought')
module.exports = {
    async getAllThoughts(req, res){
        try{
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (err) {
            res.status(500).json(err);
          }
    },
    async getOneThought(req, res){
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            .populate('reactions')
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
              }
        
              res.json(user)
        } catch (err) {
            res.status(500).json(err)
          }
    },
    async createThought(req, res){
        try{
            const thought = await Thought.create(req.body)
            // push thought to crorresponding user's thoughts array
            res.json(thought)

        } catch (err) {
            res.status(500).json(err)
          }
    },
}