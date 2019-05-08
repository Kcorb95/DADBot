const { Event } = require('klasa');
const LCD = require('../lib/structures/LCD'); // Our LCD class

module.exports = class extends Event {
    async run(message) {
        if (!this.client.ready) return null;
        await LCD.newMessage(); // Increment our value

        if (LCD.getCurrentScreen() !== -1) {
            const led = LCD.getLED(); // fetch led object
            led.on(); // turn that boi on because we want to be annoying
            await setTimeout(() => {
                led.off(); // turn that boi off because we want to be annoying
            }, 300);
            return LCD.refreshScreen();
        } // refresh screen if and only if we are on the message display screen
    }
};
