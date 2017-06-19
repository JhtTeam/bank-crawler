import React, { Component } from 'react';
import AccountInfo from './accountInfo';
import Withdrawal from './withdrawal';
import { accessToken, bankCode, branch, branchName, type, account, accountName, bankName } from '../../constants';

class Passbook extends Component {
    render() {
        return (
            <div>
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