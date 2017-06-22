import { combineReducers } from 'redux';
import { balanceReducer as balanceData, 
    withdrawalStatementReducer as withdrawalStatementData,
    bankAuthenticationReducer as bankAuthenticationData,
} from '../components/passbook/passbookReducer';

const rootReducer = combineReducers({
    balanceData,
    withdrawalStatementData,
    bankAuthenticationData
});

export default rootReducer;