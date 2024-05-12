const names = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Coollastname',
    'enter_name_here',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
];

const emailDomains = [
    'gmail.com',
    'aol.com',
    'yahoo.com',
    'outlook.com'
]

const thoughts = [
    "Sun is pretty bright today.",
    "I'm so full of energy!",
    "I wanna go back to bed...",
    "Same shit different day",
    "Feeling kinda hungry",
    "My cat is sooooo cute <3",
    "I've got nothin",
    "Hello? Anyone out there?",
];

const reactions = [
    "Cool",
    "Awesome",
    "Yeah right",
    "Disagree",
    "Lame",
    "Awwwww",
    "Right there with ya",
    "Are you sure about that?",
    "No way is that true",
    "That's what I said!",
    "Swear I have seen this exact post before",
]
// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUser = () => {
    const name = getRandomArrItem(names);
    const nonce = Math.floor(Math.random() * 100);
    return {
        username: `${name}${nonce}`,
        email: `${name}${nonce}@${getRandomArrItem(emailDomains)}`
    }
};

const getRandomThought = () =>
    `${getRandomArrItem(thoughts)}`;

const getRandomReaction = () =>
    `${getRandomArrItem(reactions)}`;

// Export the functions for use in seed.js
module.exports = { getRandomArrItem, getRandomUser, getRandomThought, getRandomReaction };
