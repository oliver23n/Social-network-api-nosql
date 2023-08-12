const mongoose = require('mongoose');
const Reaction = require('./Reaction')

const months = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];

const getMonthName = (m) => months[m];

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
    // userId:{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "User"
    // },
    reactions: [Reaction],
    timestamp: {
        type: Date,
        default: () => Date.now()
    
    },
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('createdAt').get(function (){
    return `${this.timestamp.toDateString()} at ${this.timestamp.toLocaleTimeString()}`;
});

thoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length
})

const Thought = mongoose.model('Thought',thoughtSchema)

module.exports = Thought;