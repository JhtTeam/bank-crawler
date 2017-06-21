const detail = {
    "date": "2017-01-02",
    "abridgement": "カード引落し",
    "receipt": "0",
    "payment": "60000",
    "balance": "4950000",
    "support": {
        "subSupportKey4": "subSupportValue4"
    }
}
var details = [];
var i=0;
for (; i<10; i++) {
    details.push(detail);
}
export const withdrawalStatementData = {
    "details": details,
    "support": {
        "subSupportKey": "subSupportValue1"
    }

}

export const balanceData = {
    "balance": "3000000",
    "support": {
        "item1": "value1"
    }
}