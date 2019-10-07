require('dotenv').config();
const rusling = require('../commands/rusling.js');
const tutor = require('../commands/tutor.js');
const makeTutor = require('../commands/makeTutor.js');
const purgeBot = require('../commands/purgeBot.js');
const purgeMe = require('../commands/purgeMe.js');
const setup = require('../commands/setup.js');
const update = require('../commands/update.js');
const quickpurge = require('../commands/quickpurge.js');
const help = require('../commands/help.js');
const nickname = require('../commands/nickname.js');
const support = require('../commands/support.js');

module.exports = (client, message) => {
    const config = require('./../config.json');

    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    if (message.channel.type === 'text') {
        command(message);
    }
    else if (message.channel.type === 'dm') {
        welcomeTutor(message);
    }
    return;
}

function command(message) {
    const args = message.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();

    const adminRole = message.member.guild.roles.find(r => r.name === "Admin");
    const plannerRole = message.member.guild.roles.find(r => r.name === "Ruslan Planlægger");
    const ruslingRole = message.member.guild.roles.find(r => r.name === "Rusling");

    if (message.member.highestRole.comparePositionTo(adminRole) >= 0) {
        adminCommands(message, command);
    }

    if (message.member.highestRole.comparePositionTo(plannerRole) >= 0) {
        plannerCommands(message, command, args);
    }

    if (message.member.highestRole.comparePositionTo(ruslingRole) >= 0) {
        ruslingCommands(message, command);
    } else {
        welcomeCommands(message, command, args);
    }

    message.delete();
}

function adminCommands(message, command) {
    switch (command) {
        case 'purgebot':
            purgeBot(message.channel);
            break;
        case 'purgeme':
            purgeMe(message);
            break;
        case 'quickpurge':
            quickpurge(message);
            break;
        default:
            break;
    }
}

function plannerCommands(message, command, args) {
    switch (command) {
        case 'setup':
            setup(message, command, args);
            break;
        case 'update':
            update(message, command, args);
            break;
        case 'maketutor':
            makeTutor(message, args);
            break;
        default:
            break;
    }
}

function ruslingCommands(message, command) {
    switch (command) {
        case 'help':
        case 'commands':
            help(message);
            break;
        case 'support':
            support(message);
        case 'cs':
            //cs(message);
            break;
        case 'lol':
            // lol(message);
            break;
        default:
            break;
    }
}

function welcomeCommands(message, command, args) {
    switch (command) {
        case 'rusling':
            if (message.member.nickname) {
                rusling(message);
            } else {
                message.reply(`${message.member.displayName} change your name(nickname), to your real name\nYou can use the command "!nickname YourNameHere"`);
            }
            break;
        case 'nickname':
            nickname(message, args);
            break;
        default:
            break;
    }
}

function welcomeTutor(message) {
    const args = message.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(message);
    console.log("\n" + command);
    if (message.channel.recipient.id === message.author.id && command === 'tutor2005') {
        tutor(message);
    }
}
