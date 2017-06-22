export function balanceReducer(state = {
    balance: null,
    isFetching: false,
    dataFetched: false,
    error: null
}, action) {
    switch (action.type) {
        case "BALANCE_INUQUIRY_PENDING":
            return { balance: null, isFetching: true, dataFetched: false, error: null };
        case "BALANCE_INUQUIRY_FULFILLED":
            return { balance: action.payload, isFetching: false, dataFetched: true, error: null };
        case "BALANCE_INUQUIRY_REJECTED":
            return { balance: null, isFetching: false, dataFetched: false, error: action.payload };
        default: 
            return state;   
    }
}

export function withdrawalStatementReducer(state = {
    details: [],
    isFetching: false,
    dataFetched: false,
    error: null
}, action) {
    switch (action.type) {
        case "WITHDRAWABLE_STATEMENENT_INQUIRY_CACHED_FULFILLED":
            return { details: action.payload, isFetching: false, dataFetched: true, error: null };
        case "WITHDRAWABLE_STATEMENENT_INQUIRY_REMOTE_PENDING":
            return { details: [], isFetching: true, dataFetched: false, error: null };
        case "WITHDRAWABLE_STATEMENENT_INQUIRY_REMOTE_FULFILLED":
            return { details: action.payload, isFetching: false, dataFetched: true, error: null };
        case "WITHDRAWABLE_STATEMENENT_INQUIRY_REMOTE_REJECTED":
            return { details: [], isFetching: false, dataFetched: false, error: action.payload };
        default: 
            return state;
    }
}

export function bankAuthenticationReducer(state = {
    accessToken: null,
    isFetching: false,
    dataFetched: false,
    error: null
}, action) {
    
    switch (action.type) {
        case "BANK_AUTHENTICATION_PENDING":
            return { accessToken: null, isFetching: true, dataFetched: false, error: null };
        case "BANK_AUTHENTICATION_FULFILLED":
            return { accessToken: action.payload, isFetching: false, dataFetched: true, error: null };
        case "BANK_AUTHENTICATION_REJECTED":
            return { accessToken: null, isFetching: false, dataFetched: false, error: action.payload };
        default: 
            return state;
    }
}