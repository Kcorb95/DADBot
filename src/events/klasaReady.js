const { Event } = require('klasa');
const LCD = require('../lib/structures/LCD');

module.exports = class extends Event { // this is run when the bot is "ready" and started. Happens almost immediately.
    async run() {
        this.client.lcd = LCD.getLCD(); // get our lcd object
        this.client.console.log(`LCD Ready...`); // let us know LCD is ready

        const guild = this.client.guilds.get(`217402245250154498`); // get our guild object
        LCD.initGuild(guild); // store it
        LCD.displayStats(guild); // display the first screen (member stats)
    }
};