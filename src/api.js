import axios from 'axios';
import { getBalanceInquiryUrl, getWithdrawalStatementInquiryUrl } from './constants';

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
                "X-Fsip-Access-Token": accessToken,
            }
        })
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
        axios.post(url, postData, {
            headers: {
                "X-Fsip-Access-Token": accessToken,
            }
        })
        .then(res => res.data)
        .then(data => resolve(data.details))
        .catch(err => reject(err));
    });
}