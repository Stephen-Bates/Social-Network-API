const { Types } = require('mongoose');
const { Thought, User } = require('../models/');

module.exports = {
    // get all thought
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get a thought by :thoughtId
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .populate('user', 'username');
            if (!thought) return res.status(404).json({ message: 'No thought with that ID' });

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {
            const user = await User.findOne({ _id: req.body.user });
            if (!user) return res.json({ message: `The user ${req.body.user} does not exist` });

            const thought = await Thought.create({ ...req.body, username: user.username });
            user.thoughts.addToSet(thought._id);
            user.save();

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update a thought by :thoughtID
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true },
            )

            if (!thought) return res.status(404).json({ message: 'No thought with that ID' });


            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove a thought by :thoughtID
    async removeThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
            if (!thought) return res.status(404).json({ message: 'No thought with that ID' });

            const user = await User.findOneAndUpdate(
                { thoughts: thought.id },
                { $pull: { thoughts: thought.id } },
                { new: true },
            )

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // add a reaction to thought by :thoughtID
    async addReaction(req, res) {
        try {
            const user = await User.findById(req.body.userId)
            if (!user) return res.status(404).json({ message: 'No user with that ID' });

            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: { ...req.body, user: user._id } } },
                { runValidators: true, new: true }
            );
            if (!thought) return res.status(404).json({ message: 'No thought with that ID' });

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove a reaction to a thought by :thoughtID 
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body.reactionId } } },
                { new: true }
            );
            if (!thought) return res.status(404).json({ message: 'No thought with that ID' });

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
