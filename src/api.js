import axios from 'axios';
import { getBalanceInquiryUrl, getWithdrawalStatementInquiryUrl, getBankAuthenticationUrl, getBankDeauthenticationUrl } from './constants';
import { saveWithdrawals, saveAccessToken, saveBalance } from './local';
import { appKey } from './constants';

export function getBalanceInquiryApi(accessToken, bankCode, branch, type, account) {
    const url = getBalanceInquiryUrl(bankCode);
    const postData = {
        branch: branch,
        type: type,
        account: account
    };
    return new Promise((resolve, reject) => {
        axios.post(url, postData, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "X-Fsip-Access-Token": accessToken,
                "AppKey": appKey,
            }
        })
        // axios.get("https://s3-ap-northeast-1.amazonaws.com/qmr-cloud-s3-dev/bank/balance.json")
            .then(res => res.data)
            .then(data => {
                const balance = data.balance;
                saveBalance(balance);
                resolve(balance)
            })
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
        axios.post(url, postData, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "X-Fsip-Access-Token": accessToken,
                "AppKey": appKey,
            }
        })
        .then(res => res.data)
        .then(data => {
            //save to local storage
            const details = data.details;
            saveWithdrawals(details);
            resolve(details)
        })
        .catch(err => reject(err));
    });
}

export function bankAuthentication(bankCode, branch, type, account, pin) {
    const url = getBankAuthenticationUrl(bankCode);
    const postData = {
        branch: branch,
        type: type,
        account: account,
        pin: pin,
    };
    console.log(postData);
    console.log(appKey);
    return new Promise((resolve, reject) => {
        axios.post(url, postData, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "AppKey": appKey,
            }
        })
            .then(res => res.data)
            .then(data => {
                //save to local storage
                const accessToken = data["access-token"];
                saveAccessToken(accessToken);
                resolve(accessToken)
            })
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