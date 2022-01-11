const config = require('../../../settings'); // Token etc. for bot

const { Client } = require('klasa'); // Klasa (bot framework) client
const { MessageEmbed } = require('discord.js'); // Easy access to message embeds without having to stick this in every single file we want to use one

class BotClient extends Client {
    constructor(options) {
        super({
            ...options, // extend default parameters
        });

        // Client follows us around *most* places. This allows us to access things we would potentially use a lot without having to include them all over the place.
        // Just a style preference, dunno if it makes a performance difference.
        this.config = config; // attach our settings file to a property on client
        this.lcd = null; // attach our lcd to a property on client
        this.methods = {}; // potentially a bunch of these
        this.methods.Embed = MessageEmbed; // attach our embed to a property on client
    }
}

module.exports = BotClient;