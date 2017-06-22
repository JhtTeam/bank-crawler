const END_POINT = "https://magenta-t-apimng.jp-east-1.paas.cloud.global.fujitsu.com/finplex/bankapi/kaihatsu";

export function getBalanceInquiryUrl(bankCode) {
    return `${END_POINT}/api/v1/banks/${bankCode}/balanceInquiry`;
}

export function getWithdrawalStatementInquiryUrl(bankCode) {
    return `${END_POINT}/api/v1/banks/${bankCode}/withdrawalStatementInquiry`;
}

export function getBankAuthenticationUrl(bankCode) {
    return `${END_POINT}/api/v1/banks/${bankCode}/authentication`;
}

export function getBankDeauthenticationUrl(bankCode) {
    return `${END_POINT}/api/v1/banks/${bankCode}/deauthentication`;
}

export const bankCode = "0001";
export const branch = "123";
export const branchName = "店番";
export const type = "1";
export const account = "3000001";
export const pin = "1234";
export const accountName = "口座番号";
export const bankName = "スマート銀行"

export const appKey = "NLCB2OShUDulHDuqKKAj2DKDM2ppRr4b";