import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const password = 'd6F3Efeq';

export function encrypt(data) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
}

export function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}