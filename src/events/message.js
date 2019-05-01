const { Event } = require('klasa');
const LCD = require('../lib/structures/LCD');

module.exports = class extends Event {
    async run(message) {
        await message.guild.settings.update('messagesToday', message.guild.settings.messagesToday + 1);
        if (LCD.getCurrentScreen() === 2) return LCD.refreshScreen();
    }
};