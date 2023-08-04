const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {type: Schema.Types.ObjectId, 
    default: () => new Types.ObjectId()},
    reactionBody: {type: String, maxLength: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

const thoughtSchema = new Schema({
    thoughtText: {type: String, minLength: 1, maxLength: 280},
    createdAt: {type: Date, default: Date.now},
    username: {type: String, required: true},
    reactions: [reactionSchema]
});