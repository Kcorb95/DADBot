const { KlasaClient } = require('klasa');

module.exports = KlasaClient.defaultGuildSchema
    .add('messageCount', 'integer', {
        array: false,
        configurable: false,
        default: 22673000
    })
    .add('messagesToday', 'integer', {
        array: false,
        configurable: false,
        default: 32200
    });