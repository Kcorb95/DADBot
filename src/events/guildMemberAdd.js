const { Event } = require('klasa');
const LCD = require('../lib/structures/LCD'); // LCD class

module.exports = class extends Event {
    async run(member) { // This event runs on the event where a new user joins the guild (server). It by default passes a member and client object we can use
        const lcd = LCD.getLCD(); // Get our LCD object
        const led = LCD.getLED(); // Get our LED object

        lcd.clear(); // Clear that screen
        lcd.setCursor(0, 0); // set cursor
        lcd.print(`New Member!`); // yeah
        lcd.setCursor(0, 1); // mhmm
        lcd.print(`${member.user.username}`); // display the username of the new member
        led.on(); // turn LED on to alert

        console.log(`New Member: ${member.user.username}`); // logging
        LCD.doJoin();
        setTimeout(() => { // turn that guy off...
            LCD.refreshScreen(); // refresh screen can be used because we don't know the index (technically the class does though), so this puts us back at THAT screen
            led.off(); // Turn it back off
        }, 7000); // after 7 seconds (in ms)
    }
};