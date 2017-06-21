import axios from 'axios';
import { encrypt } from './crypter';
import { getBalanceInquiryUrl, getWithdrawalStatementInquiryUrl, getBankAuthenticationUrl, getBankDeauthenticationUrl } from './constants';
import { saveWithdrawals } from './local';

export function getBalanceInquiryApi(accessToken, bankCode, branch, type, account) {
    const url = getBalanceInquiryUrl(bankCode);
    const postData = {
        branch: branch,
        type: type,
        account: account
    };
    return new Promise((resolve, reject) => {
        // axios.post(url, postData, {
        //     headers: {
        //         "X-Fsip-Access-Token": accessToken,
        //     }
        // })
        axios.get("https://s3-ap-northeast-1.amazonaws.com/qmr-cloud-s3-dev/bank/balance.json")
            .then(res => res.data)
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}

export function getWithdrawalStatementInquiryApi(accessToken, bankCode, branch, type, account) {
    const url = getWithdrawalStatementInquiryUrl(bankCode);
    const postData = {
        branch: branch,
        type: type,
        account: account
    };
    return new Promise((resolve, reject) => {
        // axios.post(url, postData, {
        //     headers: {
        //         "X-Fsip-Access-Token": accessToken,
        //     }
        // })
        // .then(res => res.data)
        // .then(data => resolve(data.details))
        // .catch(err => reject(err));
        axios.get("https://s3-ap-northeast-1.amazonaws.com/qmr-cloud-s3-dev/bank/withdrawals.json")
            .then(res => res.data)
            .then(data => {
                //encrypt data first
                saveWithdrawals(encrypt(JSON.stringify(data)));
                resolve(data.details)
            })
            .catch(err => reject(err));
    });
}

export function bankAuthentication(bankCode, branch, type, account, pin, balance) {
    const url = getBankAuthenticationUrl(bankCode);
    const postData = {
        branch: branch,
        type: type,
        account: account,
        pin: pin,
        balance: balance,
    };
    return new Promise((resolve, reject) => {
        axios.post(url, postData)
            .then(res => res.data)
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}

export function bankDeauthentication(accessToken, bankCode, branch, type, account) {
    const url = getBankDeauthenticationUrl(bankCode);
    const postData = {
        branch: branch,
        type: type,
        account: account,
    };
    return new Promise((resolve, reject) => {
        axios.post(url, postData, {
            headers: {
                "X-Fsip-Access-Token": accessToken,
            }
        })
            .then(res => res.data)
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}