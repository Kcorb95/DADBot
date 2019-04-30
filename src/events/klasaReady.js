const { Event } = require("klasa");
const LCD = require("../lib/structures/LCD");

module.exports = class extends Event {
    async run() {
        this.client.lcd = LCD.getLCD();
        this.client.console.log(`LCD Ready...`);

        const guild = this.client.guilds.get(`217402245250154498`);
        LCD.displayStats(guild);
    }

};