import { reactLocalStorage } from 'reactjs-localstorage';
import { decrypt } from './crypter';

export function saveWithdrawals(data) {
    reactLocalStorage.set('withdrawals', data);
}

export function getWithdrawals() {
    var data = reactLocalStorage.get('withdrawals');
    data = decrypt(data);
    if (data) {
        return JSON.parse(data).details;
    }
    return null;
}