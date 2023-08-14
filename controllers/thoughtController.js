const {Thought, User} = require('../models')
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
        
              res.json(thought)
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
          }
    },
    async createThought(req, res){
        try{
            const thought = await Thought.create(req.body)
            // push thought to crorresponding user's thoughts array
            const user = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: thought._id}},
                {runValidators:true, new:true})
                if (!user) {
                    return res
                      .status(404)
                      .json({ message: 'thought created, but no users with this ID' });
                  }
            
                  res.json({ message: 'thought created' });

        } catch (err) {
            res.status(500).json(err)
            console.log(err);
          }
    },
    async updateThought(req,res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {new: true}
                )
                if (!thought) {
                    return res.status(404).json({ message: 'No thought with that ID' });
                  }
                res.json({message:"Thought updated!" })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
          }
    },
    async deleteThought(req,res){
        try{
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId})
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
              }
            res.json({message:"Thought deleted!" })
        } catch (err) {
            res.status(500).json(err)
          }
        
        
    },
    async createReaction(req,res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {new: true}
            )
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
              }
        
              res.json(thought);
        }catch (err) {
            res.status(500).json(err)
          }
    },
    async deleteReaction(req,res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions:{reactionId: req.body.reactionId}}},
                {runValidators:true, new:true}
        )
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought);
    }catch (err) {
        res.status(500).json(err)
      }
    }
        
     
}