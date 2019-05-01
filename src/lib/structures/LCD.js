const numeral = require('numeral');

let LCD_OBJECT = null;
let CURRENT_SCREEN = 1;
let GUILD = null;

module.exports = class LCD {
    static initLCD(lcd) {
        LCD_OBJECT = lcd;
    }

    static initGuild(guild) {
        GUILD = guild;
    }

    static getLCD() {
        return LCD_OBJECT;
    }

    static getCurrentScreen() {
        return parseInt(CURRENT_SCREEN);
    }

    static fwdScreen() {
        if (CURRENT_SCREEN === 2) CURRENT_SCREEN = 1;
        else CURRENT_SCREEN++;
        this.refreshScreen();
    }

    static backScreen() {
        if (CURRENT_SCREEN === 1) CURRENT_SCREEN = 2;
        else CURRENT_SCREEN--;
        this.refreshScreen();
    }

    static refreshScreen() {
        const screen = this.getCurrentScreen();
        switch (screen) {
            case 1:
                this.displayStats();
                break;
            case 2:
                this.displayMessages();
                break;
        }
    }

    static displayStats() {
        LCD_OBJECT.clear();
        LCD_OBJECT.setCursor(0, 0);
        LCD_OBJECT.print(`Members: ${numeral(GUILD.memberCount)
            .format('0,0')}`);
        LCD_OBJECT.setCursor(0, 1);
        LCD_OBJECT.print(`${`Online: ${numeral(GUILD.presences.filter(presence => presence.status !== 'offline').size)
            .format('0,0')}`}`);
    }

    static displayMessages() {
        LCD_OBJECT.clear();
        LCD_OBJECT.setCursor(0, 0);
        LCD_OBJECT.print(`Messages: ${numeral(GUILD.settings.messageCount)
            .format('0.00a')}`);
        LCD_OBJECT.setCursor(0, 1);
        LCD_OBJECT.print(`${`Today: ${numeral(GUILD.settings.messagesToday)
            .format('0,0')}`}`);
    }
};