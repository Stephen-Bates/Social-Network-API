const { Schema, Types, model } = require('mongoose');
const { formatDate } = require('../utils/helpers');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: () => Date.now(),
            get: formatDate,
        },
        user: {
            type: Types.ObjectId,
            ref: 'user',
            immutable: true,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;