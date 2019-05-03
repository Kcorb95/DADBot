const { Event } = require('klasa');
const LCD = require('../lib/structures/LCD'); // Our LCD class

module.exports = class extends Event {
    async run(message) {
        const led = LCD.getLED(); // fetch led object
        led.on(); // turn that boi on because we want to be annoying
        await message.guild.settings.update('messagesToday', message.guild.settings.messagesToday + 1); // update today's count
        await message.guild.settings.update('messageCount', message.guild.settings.messageCount + 1); // update total count
        led.off(); // turn that boi off because we want to be annoying
        if (LCD.getCurrentScreen() === 2) return LCD.refreshScreen(); // refresh screen if and only if we are on the message display screen
    }
};