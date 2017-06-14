import { combineReducers } from 'redux';
import { balanceReducer as balanceData, withdrawalStatementReducer as withdrawalStatementData } from '../components/passbook/passbookReducer';

const rootReducer = combineReducers({
    balanceData,
    withdrawalStatementData,
});

export default rootReducer;