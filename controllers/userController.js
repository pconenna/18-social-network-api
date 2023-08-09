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
        }
}