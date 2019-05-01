const numeral = require('numeral');

let LCD_OBJECT = null;
let LED_OBJECT = null;
let CURRENT_SCREEN = 1;
let GUILD = null; // This feels dirty. Storing guild object so we don't have to pass it around

module.exports = class LCD {
    static initLCD(lcd) { // Store our LCD object for use
        LCD_OBJECT = lcd;
    }

    static initLED(led) { // Store our LED object for use
        LED_OBJECT = led;
    }

    static initGuild(guild) { // Store our guild object for use. This feels like a hack
        GUILD = guild;
    }

    static getLCD() { // return our LCD object
        return LCD_OBJECT;
    }

    static getLED() { // Return our Guild object (guild means discord server :) )
        return LED_OBJECT;
    }

    static getCurrentScreen() { // Return index of current screen
        return parseInt(CURRENT_SCREEN);
    }

    static fwdScreen() { // Advance to next screen (or loop back)
        if (CURRENT_SCREEN === 2) CURRENT_SCREEN = 1;
        else CURRENT_SCREEN++;
        this.refreshScreen();
    }

    static refreshScreen() { // re-load contents on screen (dynamic refreshing woo!)
        const screen = this.getCurrentScreen(); // Get current index
        switch (screen) { // Display proper screen
            case 1:
                this.displayStats();
                break;
            case 2:
                this.displayMessages();
                break;
        }
    }

    static displayStats() { // Show member statistics in server
        LCD_OBJECT.clear();
        LCD_OBJECT.setCursor(0, 0);
        LCD_OBJECT.print(`Members: ${numeral(GUILD.memberCount) // TOTAL member count
            .format('0,0')}`);
        LCD_OBJECT.setCursor(0, 1);
        LCD_OBJECT.print(`${`Online: ${numeral(GUILD.presences.filter(presence => presence.status !== 'offline').size) // TOTAL ONLINE/AFK/DND
            .format('0,0')}`}`);
    }

    static displayMessages() { // Display message statistics in server
        LCD_OBJECT.clear();
        LCD_OBJECT.setCursor(0, 0);
        // So discord, for reasons, does not allow you any way to get total message count in a guild that doesn't involve fetching 22 million messages just to increment a counter.
        // This means I set the initial value by hand based off a SIMPLE MESSAGE SEARCH THAT BOTS AREN'T ALLOWED TO DO and then let it do it's thing.
        LCD_OBJECT.print(`Messages: ${numeral(GUILD.settings.messageCont)
            .format('0.00a')}`);// Format because we don't have space for daaaaaays
        LCD_OBJECT.setCursor(0, 1);
        // Again, have to set this by hand but at least it is updated on the message event. *Fairly* accurate based on my initial hand-recording.
        LCD_OBJECT.print(`${`Today: ${numeral(GUILD.settings.messagesToday)
            .format('0,0')}`}`); // Format because we don't have space for daaaaaays
    }
};