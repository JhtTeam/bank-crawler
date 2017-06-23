import { reactLocalStorage } from 'reactjs-localstorage';
import { encrypt, decrypt } from './crypter';
import { accessTokenTimeout } from './constants';

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
    const currentTime = new Date().getTime();
    const accessTokenExpireIn = currentTime + accessTokenTimeout;
    console.log("accessTokenExpireIn: " + accessTokenExpireIn);
    reactLocalStorage.set('access_token', encrypt(accessToken));
    reactLocalStorage.set('access_token_expire_in', accessTokenExpireIn);
}

export function getAccessToken() {
    const currentTime = new Date().getTime();
    const accessTokenExpireIn = reactLocalStorage.get('access_token_expire_in');
    console.log("accessTokenExpireIn: " + accessTokenExpireIn);
    console.log("currentTime: " + currentTime);
    if (!accessTokenExpireIn || accessTokenExpireIn <= currentTime) {
        //clear accessToken in localStorage;
        reactLocalStorage.set('access_token', null);
        return null;
    }
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