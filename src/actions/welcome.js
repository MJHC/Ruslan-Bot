
const Discord = require('discord.js');
const config = require('../config.json')

module.exports.execute = (client) => {
    const channel = client.channels.cache.find(ch => ch.name === 'welcome'); // change to env file id
        try {
            channel.bulkDelete(100);
        } catch (err) {
            console.log(err);
        }


    let exampleEmbed = "welcome"
    channel.send(exampleEmbed);
}
