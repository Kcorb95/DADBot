let LCD_OBJECT = null;

module.exports = class LCD {

    static initLCD(lcd) {
        LCD_OBJECT = lcd;
    }

    static getLCD() {
        return LCD_OBJECT;
    }

    static displayStats(guild) {
        LCD_OBJECT.clear();
        LCD_OBJECT.setCursor(0, 0);
        LCD_OBJECT.print(`Members: ${guild.memberCount}`);
        LCD_OBJECT.setCursor(0, 1);
        LCD_OBJECT.print(`${`Online: ${guild.presences.filter(presence => presence.status !== 'offline').size}`}`);
    }
};