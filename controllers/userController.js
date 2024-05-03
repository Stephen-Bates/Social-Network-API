const { Schema, Types } = require('mongoose');
const User = require('../models/User');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get a user by :userId
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            // ?: Is this important?    
            // .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update a user by :userID
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true }
            )

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove a user by :userID
    async removeUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // add a friend of user by :userID and :friendId
    async addFriend(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            const friend = await User.findOne({ _id: req.params.friendId })

            if (!user || !friend) {
                return res.json({ message: [].concat(!user ? `UserId: No user with ID ${req.params.userId}.` : [], !friend ? `FriendId: No user with ID ${req.params.friendId}` : []) });
            }

            if (user.friends.includes(friend._id)) {
                return res.json({ message: "User already has friend registered" })
            }

            user.friends.push(friend._id);
            user.save();

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove a friend of user by :userID and :friendId
    async removeFriend(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })


            if (!user.friends.includes(req.params.friendId)) {
                return res.json({message: "User doesn't have that friend registered"})
            }
            
            user.friends.pop(req.params.friendId);
            user.save();

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
