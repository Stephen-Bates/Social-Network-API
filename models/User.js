const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            immutable: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: v => {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: props => `${props.value} is not a valid email address`
            },
        },
        thoughts: [{ type: Types.ObjectId, ref: 'thought' }],
        friends: [{ type: Types.ObjectId, ref: 'user' }],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;