const { Schema, model } = require('mongoose');
function formateDate(timestamp){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return timestamp.toLocaleDateString("en-US",options) 
}

const reactionSchema = new Schema({
    reactionId: {type: Schema.Types.ObjectId, 
    default: () => new Types.ObjectId()},
    reactionBody: {type: String, maxLength: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

const thoughtSchema = new Schema({
    thoughtText: {type: String, minLength: 1, maxLength: 280},
    createdAt: {type: Date, default: Date.now, get: timestamp => formateDate(timestamp)},
    username: {type: String, required: true},
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        },
        id: false,
    });

thoughtSchema.virtual('reactionCount')
.get(function(){
    return this.reactions.length
})

const Thought = model('thought', thoughtSchema);
module.exports = Thought; 