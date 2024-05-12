const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomArrItem, getRandomUser, getRandomThought, getRandomReaction } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
        await connection.dropCollection('users');
    }

    let studentsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (studentsCheck.length) {
        await connection.dropCollection('thoughts');
    }


    // Create empty array to hold the users
    const users = new Set();

    // Loop 20 times -- add users to the array
    for (let i = 0; i < 20; i++) {
        users.add(getRandomUser());
    }

    // Add students to the collection and await the results
    const userData = await User.insertMany([...users]);

    // Add thoughts and friends for each user
    for (const user of userData) {
        const thoughtData = await Thought.insertMany(generateThoughts().map(thought => {
            return {
                thoughtText: thought,
                user: user._id,
                reactions: generateReactions().map(reaction => {
                    return {
                        reactionBody: reaction,
                        user: getRandomArrItem(userData)._id,
                    }
                })
            }
        }));
        user.thoughts.addToSet(...thoughtData.map(thought => thought._id));

        while (user.friends.length < Math.floor(Math.random() * 7)) {
            user.friends.addToSet(getRandomArrItem(userData.filter(data => data._id !== user._id))._id);
        }

        user.save();
    }

    console.info('Seeding complete! 🌱');
    process.exit(0);
});

function generateThoughts(userThoughts = []) {
    if (Math.random() > ((1 + userThoughts.length) / 5)) {
        userThoughts.push(getRandomThought());
        return generateThoughts(userThoughts);
    }
    return userThoughts;
}

function generateReactions(thoughtReactions = []) {
    if (Math.random() > ((2 + thoughtReactions.length) / 5)) {
        thoughtReactions.push(getRandomReaction());
        return generateThoughts(thoughtReactions);
    }
    return thoughtReactions;
}