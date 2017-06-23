import React, { Component } from 'react';
import { getBalanceInquiry } from './actions';
import { connect } from 'react-redux';
import { getBalance } from '../../local';
import './accountInfo.css';

class AccountInfo extends Component {
    constructor(props) {
        super(props);
        const { accessToken } = this.props;
        if (accessToken) {
            this.props.loadBalanceInquiry(accessToken);
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        // console.log(this.props);
        const accessToken = this.props.accessToken;
        const nextAccessToken = nextProps.accessToken;
        if (nextAccessToken && accessToken !== nextAccessToken) {
            this.props.loadBalanceInquiry(nextAccessToken);
        }
    }

    render() {
        console.log("AccountInfo.... render");
        console.log(this.props);
        const { bankName, account, accountName, branch, branchName, balanceData } = this.props;
        var balance = getBalance();
        if (balanceData && balanceData.balance) {
            balance = balanceData ? balanceData.balance : 0;
            return (
                <div className="account_info">
                    <div className="bank_name">
                        {bankName}
                    </div>
                    <div className="bank_about">
                        <span className="store_name">{branchName}</span>
                        <span className="store_number">{branch}</span>
                        <span className="account_name">{accountName}</span>
                        <span className="account_number">{account}</span>
                    </div>
                    <div className="bank_balance">
                        <span className="balance">現残高</span>
                        <span className="balance_money">¥ {balance}</span>
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        balanceData: state.balanceData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { bankCode, branch, type, account } = ownProps;
    return {
        loadBalanceInquiry: (accessToken) => {
            dispatch(getBalanceInquiry(accessToken, bankCode, branch, type, account))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);