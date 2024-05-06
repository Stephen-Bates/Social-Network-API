const { Schema } = require('mongoose');
const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .select('-__v');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get a user by :userId
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');
            if (!user) return res.json({ message: 'No user with that ID' });
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update a user by :userID
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true },
            )
            if (!user) return res.json({ message: 'No user with that ID' });

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove a user by :userID
    async removeUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) return res.json({ message: 'No user with that ID' });

            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // add a friend of user by :userID and :friendId
    async addFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });
            if (!friend) return res.json(`User ${req.params.friendId} not found`);

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: friend._id } },
                { new: true });
            if (!user) return res.json(`User ${req.params.userId} not found`);

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove a friend of user by :userID and :friendId
    async removeFriend(req, res) {
        try {
            const user = await User.findAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true });
            if (!user) return res.status(404).json({ message: 'No user with that ID' });

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
