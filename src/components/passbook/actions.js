import { getBalanceInquiryApi, getWithdrawalStatementInquiryApi } from '../../api';

export function getBalanceInquiry(accessToken, bankCode, branch, type, account) {
    return {
        type: 'BALANCE_INUQUIRY',
        payload: getBalanceInquiryApi(accessToken, bankCode, branch, type, account)
    }
}

export function getWithdrawalStatementInquiry(accessToken, bankCode, branch, type, account) {
    return {
        type: 'WITHDRAWABLE_STATEMENENT_INQUIRY',
        payload: getWithdrawalStatementInquiryApi(accessToken, bankCode, branch, type, account)
    }
}