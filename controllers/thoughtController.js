const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req,res) {
        try{
            const thoughts = await Thought.find()
            .select('-__v');
          
            res.status(200).json(thoughts);
        }catch (err){
            res.status(500).json(err);
            console.log(err);
        }
    },
    async getSingle(req,res){
        try{    
            const singleThought = await Thought.findOne({_id: req.params.thoughtId})
                .select('-__v');
            if(!singleThought){
                return res.status(404).json({message: "Thought not found!"})
            }
            res.status(200).json(singleThought);

        }catch(err){
            res.status(500).json(err);
        }
    },
    async createThought(req,res){
        try{
            if(!req.body.thoughtText || !req.body.userId ||!req.body.username){
                return res.json({message: "must contain text and userId"});
            }
            const newThought = await Thought.create(req.body);
            await newThought.save();
            const updateUser = await User.findOneAndUpdate({ _id: req.body.userId },
                { $addToSet: { thoughts: newThought._id } },
                { new: true });
            res.status(200).json(newThought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    async updateThought(req,res){
        try{
            const updated = await Thought.findOne({_id: req.params.thoughtId});
            updated.thoughtText = req.body.thoughtText;
            await updated.save();
            res.status(200).json(updated);
        }catch(err){
            res.status(500).json(err)
        }
    },
    async deleteThought(req,res){
        try{
            const deleted = await Thought.findOneAndDelete({_id: req.params.thoughtId});
            if(!deleted){
                return res.status(404).json({message: "Thought not found!"});
            }
            res.status(200).json({message:"Thought deleted!"});
        }catch(err){    
            res.status(500).json(err);
        }
    },
    async addReaction(req,res){
        try{
            if (!req.body.reactionBody || !req.body.username ){
                return res.status(400).json({message: "must have reaction body and username"});
            }
            const reaction ={
                reactionBody: req.body.reactionBody,
                username: req.body.username
            };
            const thought = await Thought.findByIdAndUpdate({_id: req.params.thoughtId},
                {$addToSet: {reactions: reaction }},
                {new: true});
            res.status(200).json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    async deleteReaction(req,res){
        try{
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                { $pull: { reactions: {reactionId: req.body.reactionId} } },
                { new: true })
            res.status(200).json({message:"reaction removed!"})
        }catch(err){
            res.status(500).json(err);
        }
    }
}