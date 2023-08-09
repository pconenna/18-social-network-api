const User = require('../models/User');
module.exports = {
    async getAllUsers(req, res){
        try{
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json(err);
          }
    },
    async getOneUser(req, res){
        try{
            const user = await User.findOne({_id: req.params.userId})
            .populate('thoughts')
            .populate('friends')
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
              }
        
              res.json(user)
        } catch (err) {
            res.status(500).json(err)
          }
    },
    async createUser(req, res){
        try{
            const user = await User.create(req.body)
            res.json(user)

        } catch (err) {
            res.status(500).json(err)
          }
    },
    async updateUser(req, res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            )
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
              }
        
              res.json(user)
        } catch (err) {
            res.status(500).json(err)
          }
    },
    async deleteUser(req,res){
        try{
            const user = await User.findOneAndRemove({_id: req.params.userId})
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
              }
            res.json({message:"User deleted!" })
        } catch (err) {
            res.status(500).json(err)
          }
        },
    async addFriend(req,res){
        try{const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$push: {friends: req.params.friendId}},
            {runValidators:true, new:true}
        )
        // reciprocate so that the friended person adds the first user back
        // not sure if this is needed
        // const user1 = await User.findOneAndUpdate(
        //     {_id: req.params.friendId},
        //     {$push: {friends: req.params.userID}},
        //     {runValidators:true, new:true}
        // )
        if (!user) {
            return res
              .status(404)
              .json({ message: 'No users with this ID' });
          }
    
          res.json({ message: 'Added Friend!' });
        } catch (err) {
            res.status(500).json(err)
          }
        
    }, 
    async removeFriend(req,res){
        try{const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidators:true, new:true}
        )
        // it makes more sense to have the reciprocation in the removal of friends
        const user1 = await User.findOneAndUpdate(
            {_id: req.params.friendId},
            {$pull: {friends: req.params.userId}},
            {runValidators:true, new:true}
        )
        if (!user || !user1) {
            return res
              .status(404)
              .json({ message: 'No users with this ID' });
          }
    
          res.json({ message: 'Removed Friend!' });
        } catch (err) {
            res.status(500).json(err)
          }  
    }
}