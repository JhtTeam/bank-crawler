import React, { Component, PropTypes } from 'react';
import AccountInfo from './accountInfo';
import Withdrawal from './withdrawal';
import Dimensions from 'react-dimensions';
import { accessToken, bankCode, branch, branchName, type, account, accountName, bankName } from '../../constants';
import './passbook.css';

class Passbook extends Component {
    render() {
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

export default Dimensions({ containerStyle: { display: 'inline-block', width: '100%' } })(Passbook);