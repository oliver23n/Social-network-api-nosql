const { Schema, Types, model } = require('mongoose');
const Reaction = require('./Reaction')

const thoughtSchema = new Schema({

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

thoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length
})

const Thought = model('Thought',thoughtSchema)

module.exports = Thought;