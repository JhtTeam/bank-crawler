import { bankAuthentication, getBalanceInquiryApi, getWithdrawalStatementInquiryApi } from '../../api';
import { getWithdrawals, getBalance } from '../../local';

export function getBalanceInquiry(accessToken, bankCode, branch, type, account) {
    return dispatch => {
        return dispatch({
            type: 'BALANCE_INUQUIRY',
            payload: Promise.all([
                dispatch({
                    type: "BALANCE_INUQUIRY_CACHED",
                    payload: new Promise((resolve, reject) => {
                        resolve(getBalance());
                    })
                }),
                dispatch({
                    type: 'BALANCE_INUQUIRY_REMOTE',
                    payload: getBalanceInquiryApi(accessToken, bankCode, branch, type, account)
                })
            ])
        })
    }

}

export function getWithdrawalStatementInquiry(accessToken, bankCode, branch, type, account) {
    return dispatch => {
        return dispatch({
            type: "WITHDRAWABLE_STATEMENENT_INQUIRY",
            payload: Promise.all([
                dispatch({
                    type: "WITHDRAWABLE_STATEMENENT_INQUIRY_CACHED",
                    payload: new Promise((resolve, resject) => {
                        resolve(getWithdrawals());
                    })
                }),
                dispatch({
                    type: 'WITHDRAWABLE_STATEMENENT_INQUIRY_REMOTE',
                    payload: getWithdrawalStatementInquiryApi(accessToken, bankCode, branch, type, account)
                })
            ])
        });
    }
}

export function getBankAuthentication(bankCode, branch, type, account, pin) {
    return {
        type: 'BANK_AUTHENTICATION',
        payload: bankAuthentication(bankCode, branch, type, account, pin)
    }
}