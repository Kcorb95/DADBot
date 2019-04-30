const config = require('../../../settings');

const { Client } = require('klasa');
const { MessageEmbed } = require('discord.js');

class BotClient extends Client {
    constructor(options) {
        super({
            ...options,
        });

        this.config = config;
        this.lcd = null;
        this.methods = {};
        this.methods.Embed = MessageEmbed;
    }
}

module.exports = BotClient;