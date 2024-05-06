const { Schema, Types } = require('mongoose');
const { formatDate } = require('../utils/helpers');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
            immutable: true,
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: () => Date.now(),
            get: formatDate,
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

module.exports = reactionSchema;
