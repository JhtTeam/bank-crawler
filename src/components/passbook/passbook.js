import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountInfo from './accountInfo';
import Withdrawal from './withdrawal';
import Dimensions from 'react-dimensions';
import { getBankAuthentication } from './actions';
import { bankCode, branch, branchName, type, account, pin, accountName, bankName } from '../../constants';
import { getAccessToken } from '../../local';
import './passbook.css';

var accessToken = "";

class Passbook extends Component {
    componentDidMount() {
        if (!accessToken) {
            this.props.getBankAuthentication();
        }
    }
    
    render() {
        const { bankAuthenticationData } = this.props;
        accessToken = (bankAuthenticationData.accessToken) ? bankAuthenticationData.accessToken : getAccessToken();
        console.log("Passbook... accessToken = " + accessToken);
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: this.props.containerHeight }}>
                <AccountInfo
                    bankName={bankName}
                    accessToken={accessToken}
                    bankCode={bankCode}
                    branch={branch}
                    branchName={branchName}
                    type={type}
                    account={account}
                    accountName={accountName} />
                <div style={{ flex: 1, display: 'flex', width: '100%' }}>
                    <div style={{ display: 'inline-block', width: '100%' }}>
                        <Withdrawal
                            accessToken={accessToken}
                            bankCode={bankCode}
                            branch={branch}
                            type={type}
                            account={account} />
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        bankAuthenticationData: state.bankAuthenticationData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getBankAuthentication: () => {
            dispatch(getBankAuthentication(bankCode, branch, type, account, pin))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dimensions({ containerStyle: { display: 'inline-block', width: '100%' } })(Passbook))