const crypto = require('crypto');

async function getHashed(secret) {
    const key = await crypto.pbkdf2Sync(secret, 'fghERT545tyuFDSDFSDFqW', 100000, 64, 'sha512');
    return key.toString('hex');
}

module.exports = {
    getHashed,
};
