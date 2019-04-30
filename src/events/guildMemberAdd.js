const { Event } = require('klasa');
const LCD = require('../lib/structures/LCD');

module.exports = class extends Event {
    async run(member) {
        let lcd = LCD.getLCD();

        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print(`New Member!`);
        lcd.setCursor(0, 1);
        lcd.print(`${member.user.username}`);

        console.log(`New Member: ${member.user.username}`);

        setTimeout(() => {
            LCD.displayStats(member.guild);
        },7000)
    }
};