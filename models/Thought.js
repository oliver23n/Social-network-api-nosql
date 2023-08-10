const mongoose = require('mongoose');
const Reaction = require('./Reaction')

const thoughtSchema = new mongoose.Schema({

    thoughtText: {
        type: String,
        required: true,
        minLength:1,
        maxLength:280
    },
    username: {
        type: String,
        required: true,

    },
    reactions: [Reaction],
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// thoughtSchema.methods.getTimeStamp = function (){

// }
thoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length
})

const Thought = mongoose.model('Thought',thoughtSchema)

module.exports = Thought;