const { KlasaClient } = require('klasa');

module.exports = KlasaClient.defaultGuildSchema
    .add('messageCount', 'integer', { // key, type, options
        array: false,
        configurable: false,
        default: 22673000 // default value input by hand because discord api does not allow fetching message counts :c
    })
    .add('messagesToday', 'integer', {
        array: false,
        configurable: false,
        default: 32200 // default value input by hand because discord api does not allow fetching message counts :c
    });