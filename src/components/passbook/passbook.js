import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountInfo from './accountInfo';
import queryString from 'query-string';
import Withdrawal from './withdrawal';
import Dimensions from 'react-dimensions';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
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
        console.log("passbook .... render: " + this.props.containerWidth);
        const { bankAuthenticationData } = this.props;
        accessToken = (bankAuthenticationData.accessToken) ? bankAuthenticationData.accessToken : getAccessToken();
        var hideToolbar = false;
        if (this.props.location.search) {
            const queryParams = queryString.parse(this.props.location.search);
            hideToolbar = queryParams['hideToolbar'] === 'true';
        }

        const toolBar = hideToolbar ? null : (
            <Toolbar className="Toolbar" style={{ justifyContent: 'center', backgroundColor: 'transparent' }}>
                <ToolbarTitle text="通帳" />
            </Toolbar>);
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: this.props.containerHeight }}>
                {toolBar}
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
                    <Withdrawal
                        accessToken={accessToken}
                        bankCode={bankCode}
                        branch={branch}
                        type={type}
                        account={account} />
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