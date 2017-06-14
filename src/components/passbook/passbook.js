import React, { Component } from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import AccountInfo from './accountInfo';
import Withdrawal from './withdrawal';
import { accessToken, bankCode, branch, branchName, type, account, accountName, bankName } from '../../constants';

class Passbook extends Component {
    render() {
        return (
            <div>
                <Toolbar>
                    <ToolbarTitle text="通帳" />
                </Toolbar>

                <AccountInfo 
                    bankName={bankName}
                    accessToken={accessToken}
                    bankCode={bankCode}
                    branch={branch}
                    branchName={branchName}
                    type={type}
                    account={account}
                    accountName={accountName}/>

                <Withdrawal 
                    accessToken={accessToken}
                    bankCode={bankCode}
                    branch={branch}
                    type={type}
                    account={account}/>
            </div>
        );
    }
}

export default Passbook;