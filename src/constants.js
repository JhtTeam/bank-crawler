// const END_POINT = "https://magenta-t-apimng.jp-east-1.paas.cloud.global.fujitsu.com/finplex/bankapi/kaihatsu";
const END_POINT = "https://api-dev.finplex.global.fujitsu.com/finplex/bankapi/kaihatsu-probank/api/v1/banks";

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

// export const bankCode = "0001";
// export const branch = "123";
// export const branchName = "店番";
// export const type = "1";
// export const account = "3000001";
// export const pin = "1234";
// export const accountName = "口座番号";
// export const bankName = "スマート銀行"
// export const appKey = "NLCB2OShUDulHDuqKKAj2DKDM2ppRr4b";
// export const accessTokenTimeout = 60 * 60 * 1000;


export const bankCode = "0126";
export const branch = "103";
export const branchName = "店番";
export const type = "1";
export const account = "0022562";
export const pin = "1511";
export const accountName = "口座番号";
export const bankName = "スマート銀行"
export const appKey = "Bsv3KQAWWHGBbCKn6EXmAoeXteaVBwrw";
export const accessTokenTimeout = 60 * 60 * 1000;