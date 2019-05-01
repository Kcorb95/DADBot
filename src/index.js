const { TOKEN, OWNER_ID, PREFIX } = require('../settings.json');

const BotClient = require('./lib/structures/BotClient');

const arduino = require('johnny-five');
const board = new arduino.Board();
const LCD = require('./lib/structures/LCD');

board.on('ready', async () => {
    let lcd = new arduino.LCD({
        pins: [7, 8, 9, 10, 11, 12], // What pins
        backlight: 6,
        rows: 2,
        cols: 16
    });

    const button = new arduino.Button(13);

    LCD.initLCD(lcd);
    lcd = LCD.getLCD();
    lcd.clear();
    lcd.print(`Init. Complete!`);

    new BotClient({
        prefix: PREFIX,
        commandEditing: true,
        disableEveryone: true,
        ownerID: OWNER_ID,
        typing: true,
        disabledEvents: [
            'GUILD_SYNC',
            'CHANNEL_PINS_UPDATE',
            'USER_NOTE_UPDATE',
            'RELATIONSHIP_ADD',
            'RELATIONSHIP_REMOVE',
            'USER_SETTINGS_UPDATE',
            'VOICE_STATE_UPDATE',
            'VOICE_SERVER_UPDATE',
            'TYPING_START',
            'PRESENCE_UPDATE'
        ],
        console: { useColor: true },
        messageSweepInterval: 60,
        messageCacheLifetime: 120,
        commandMessageLifetime: 120,
        readyMessage: client => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
    }).login(TOKEN);

    button.on('press', () => {
        LCD.fwdScreen();
    });
});