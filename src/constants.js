const END_POINT = "https://finpelx/com";

export function getBalanceInquiryUrl(bankCode) {
    return `${END_POINT}/api/v1/banks/${bankCode}/balanceInquiry`;
}

export function getWithdrawalStatementInquiryUrl(bankCode) {
    return `${END_POINT}/api/v1/banks/${bankCode}/withdrawalStatementInquiry`;
}

export const accessToken = "cfe427b5-8ff0-436d-bda5-7465232bf4ed";
export const bankCode = "0000";
export const branch = "000";
export const branchName = "店番";
export const type = "1";
export const account = "0000000";
export const accountName = "口座番号";
export const bankName = "スマート銀行"