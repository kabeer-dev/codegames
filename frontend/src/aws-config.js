// aws-config.js
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'AKIA432JA3FF7UFYX3ZK',
    secretAccessKey: '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',
    region: 'ca-central-1'
});

module.exports = AWS;
