import { reactLocalStorage } from 'reactjs-localstorage';
import { encrypt, decrypt } from './crypter';

export function saveWithdrawals(withdrawals = []) {
    if (!withdrawals  || withdrawals.length === 0) return;
    const encrytped = encrypt(JSON.stringify(withdrawals));
    reactLocalStorage.set('withdrawals', encrytped);
}

export function getWithdrawals() {
    var data = reactLocalStorage.get('withdrawals');
    if (data) {
        data = decrypt(data);
        return JSON.parse(data);
    }
    return null;
}

export function saveAccessToken(accessToken) {
    reactLocalStorage.set('access_token', encrypt(accessToken));
}

export function getAccessToken() {
    const data = reactLocalStorage.get('access_token');
    if (data) {
        return decrypt(data);
    }
    return null;
}

export function saveBalance(balance) {
    reactLocalStorage.set('balance', encrypt(balance));
}

export function getBalance(defaultValue = 0) {
    const data = reactLocalStorage.get('balance');
    if (data) {
        return decrypt(data);
    }
    return defaultValue;
}