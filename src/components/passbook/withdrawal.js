import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import WithdrawalRow from './withdrawalRow';
import WithdrawalHeader from './withdrawalHeader';
import { getWithdrawalStatementInquiry } from './actions';
import { connect } from 'react-redux';
import { withdrawalStatementData } from '../../mock';
import 'bootstrap/dist/css/bootstrap.css';

class Withdrawal extends Component {
    render() {
        // const { withdrawalStatementData } = this.props;
        const withdrawals = withdrawalStatementData.details;
        // const withdrawals = require('../')
        // const columns = this._getColumns();
        console.log(withdrawals);

        if (withdrawals && withdrawals.length > 0) {
            return (
                <ReactDataGrid 
                    columns={this._getColumns()}
                    rowGetter={(i) => withdrawals[i]}
                    rowsCount={withdrawals.length}
                    rowHeight={30}
                    minHeight={500}
                    rowRenderer={WithdrawalRow}
                />
            );
        }
        return (
            <div>
                
            </div>
        );
    }

    _getColumns() {
        return [
            {key: 'date', name: '日付', headerRenderer: WithdrawalHeader},
            {key: 'abridgement', name: 'お取引内容',  headerRenderer: WithdrawalHeader},
            {key: 'payment', name: 'お支払い',  headerRenderer: WithdrawalHeader},
            {key: 'receipt', name: 'お預かり',  headerRenderer: WithdrawalHeader},
            {key: 'balance', name: '差引残高',  headerRenderer: WithdrawalHeader},
        ];
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        withdrawalStatementData: state.withdrawalStatementData
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    const { accessToken, bankCode, branch, type, account } = ownProps;
    return {
        loadWithdrawalStatement: () => {
            dispatch(getWithdrawalStatementInquiry(accessToken, bankCode, branch, type, account))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal);
