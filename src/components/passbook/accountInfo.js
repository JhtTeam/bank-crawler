import React, { Component } from 'react';
import { getBalanceInquiry } from './actions';
import { connect } from 'react-redux';
import './accountInfo.css';

class AccountInfo extends Component {
    render() {
        console.log(this.props);
        const { bankName, account, accountName, branch, branchName, balanceData } = this.props;
        const balanceMoney = balanceData ? balanceData.balance : 0;
        return (
            <div className="account_info">
                <div className="bank_name">
                    {bankName}
                </div>
                <div className="bank_about">
                    <ul>
                        <li className="store_name">{branchName}</li>
                        <li className="store_number">{branch}</li>
                        <li className="account_name">{accountName}</li>
                        <li className="account_number">{account}</li>
                    </ul>
                </div>
                <div className="bank_balance">
                    <ul>
                        <li className="balance">現残高</li>
                        <li className="balance_money">¥ {balanceMoney}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        balanceData: state.balanceData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { accessToken, bankCode, branch, type, account } = ownProps;
    return {
        loadBalanceInquiry: () => {
            dispatch(getBalanceInquiry(accessToken, bankCode, branch, type, account))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
