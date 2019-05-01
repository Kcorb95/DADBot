const { TOKEN, OWNER_ID, PREFIX } = require('../settings.json'); // Required for starting bot

const BotClient = require('./lib/structures/BotClient'); // Extend Klasa client so we can do fancy stuff

const arduino = require('johnny-five'); // Framework to interface arduino
const board = new arduino.Board(); // Our board object
const LCD = require('./lib/structures/LCD'); // Should actually call this dashboard because it's more than just an LCD now....

board.on('ready', async () => { // When board is ready, init components and THEN start bot.
    let lcd = new arduino.LCD({ // Define our LCD
        pins: [7, 8, 9, 10, 11, 12], // What pins it is on
        backlight: 6, // The backlight pin
        rows: 2, // rows x cols
        cols: 16
    });

    const button = new arduino.Button('A0'); // init button and the pin it's connected to
    const led = new arduino.Led(13); // Init LED and the pin it's connected to

    LCD.initLED(led); // Store our LED object
    LCD.initLCD(lcd);  // Store our LCD object

    lcd = LCD.getLCD(); // Alert that board init is complete on LCD
    lcd.clear();
    lcd.print(`Init. Complete!`);

    new BotClient({ // CREATE OUR BOT CLIENT
        prefix: PREFIX, // Even though we don't have commands, still need a prefix
        commandEditing: false, // No need to cache that because we aren't using commands >.>
        disableEveryone: true, // To be safe, no @everyone pings from the bot plsty
        ownerID: OWNER_ID, // Me
        typing: true, // Shows the bot as "typing" when responding to our non-existent commands
        disabledEvents: [ // Could really disable most of these because we only really care about ready, join and message.
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
        console: { useColor: true }, // Fancy output
        messageSweepInterval: 60, // Clean cache fast
        messageCacheLifetime: 120, // ^^
        commandMessageLifetime: 120, // ^^
        readyMessage: client => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.` // Tell us that the entire show is on the road
    }).login(TOKEN); // Actually log the bot in

    button.on('press', () => { // ON PRESS for our button
        LCD.fwdScreen(); // advance to the next screen
    });
});