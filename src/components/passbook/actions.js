import { getBalanceInquiryApi, getWithdrawalStatementInquiryApi } from '../../api';
// import { withdrawalStatementData } from '../../mock';
import { getWithdrawals } from '../../local';

export function getBalanceInquiry(accessToken, bankCode, branch, type, account) {
    return {
        type: 'BALANCE_INUQUIRY',
        payload: getBalanceInquiryApi(accessToken, bankCode, branch, type, account)
    }
}

// export function getWithdrawalStatementInquiry(accessToken, bankCode, branch, type, account) {
//     return {
//         type: 'WITHDRAWABLE_STATEMENENT_INQUIRY',
//         payload: getWithdrawalStatementInquiryApi(accessToken, bankCode, branch, type, account)
//     }
// }

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