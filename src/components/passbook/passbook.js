import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountInfo from './accountInfo';
import queryString from 'query-string';
import Withdrawal from './withdrawal';
import Dimensions from 'react-dimensions';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import { getBankAuthentication } from './actions';
import { bankCode, branch, branchName, type, account, pin, accountName, bankName } from '../../constants';
import { getAccessToken } from '../../local';
import './passbook.css';
import IconOkanereko from '../../images/icon_okanereko';
import IconButton from 'material-ui/IconButton';
import ButtonOkanereko from '../../images/btn_okanereco2.svg';
import ButtonOkanerekoDone from '../../images/btn_okanereko2_done.svg';
import ExportCSVButton from '../../images/ExportCSVButton';
import ArrowBack from '../../images/arrow-back';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

var accessToken = "";

// const ExportCSVButton = (props) => {
//     console.log(props);
//     return (
//         <button onClick={() => props.onPress()} style={props.style}>
//             <img src={props.icon} alt="Export CSV" />
//         </button>
//     );

// }
class Passbook extends Component {
    state = {
        exportCSV: false,
    }
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

        const toolbar = hideToolbar ? null : (
            // <div style={{ flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center' }}>
            //     <span style={{ textSize: 26, backgroundColor: 'blue' }}>通帳</span>
            //     <ExportCSVButton icon={ButtonOkanereko} onPress={() => this._exportCSV()} style={{position: 'fixed', right: 10}} />
            // </div>
            // <Toolbar className="Toolbar" style={{ justifyContent: 'center', backgroundColor: 'transparent' }}>
            <AppBar
                title="通帳"
                style={{ backgroundColor: 'transparent', alignItems: 'center', margin: 0, paddingTop: 20 }}
                titleStyle={{ color: '#4A4A4A', textAlign: 'center' }}
                iconElementLeft={
                    <div style={{ minWidth: 100 }}>
                        <IconButton
                            iconStyle={{ width: 35, height: 35 }}
                            style={{ marginLeft: 0, padding: 0, alignItems: 'center' }}
                            buttonStyle={{ margin: 0, padding: 0 }}
                            onTouchTap={(event) => this._actionBack()}
                            >
                            <ArrowBack color="#5BAA04" viewBox="-4 -4 24 24"/>
                        </IconButton>
                    </div>
                }
                iconElementRight={
                    <RaisedButton
                        disabled={!this.props.withdrawals || this.props.withdrawals.length == 0}
                        backgroundColor="#5BAA04"
                        hoverColor="#3C7201"
                        style={{ margin: 0, padding: 0, height: 35, minWidth: 100 }}
                        label={this.state.exportCSV ? "完了" : "取り込み"}
                        labelStyle={{ margin: 0, fontWeight: 'bold', fontSize: 16, paddingLeft: 0, paddingRight: 8, color: 'white'}}
                        icon={
                            <IconOkanereko style={{ width: 24, height: 24, margin: 0, marginTop: 3 }} />
                        }
                        buttonStyle={{ paddingTop: 0, paddingLeft: 4, margin: 0 }}
                        onTouchTap={(event) => this._exportCSV()}
                        />
                }
                iconStyleRight={{ marginRight: -16, marginLeft: 8, marginTop: 0, padding: 0 }}
                />
        );
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: this.props.containerHeight }}>
                {toolbar}
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
                        ref="withdrawal"
                        accessToken={accessToken}
                        bankCode={bankCode}
                        branch={branch}
                        type={type}
                        exportCSV={this.state.exportCSV}
                        account={account} />
                </div>

            </div>
        );
    }

    _actionBack() {
        console.log("action back");
        window.open("passbook:back", '_blank');
    }
    _exportCSV() {
        const {exportCSV} = this.state;
        if (exportCSV) {
            console.log("_exportCSV");
            console.log(this.refs.withdrawal.getWrappedInstance().refs['wrappedInstance']);
            const withdrawal = this.refs.withdrawal.getWrappedInstance().refs['wrappedInstance'];
            if (withdrawal) {
                // const withdrawal = dimension.refs.Withdrawal;
                // console.log(withdrawal);
                withdrawal.exportCSV();
                // this.refs.withdrawal.getWrappedInstance().getWrappedInstance().exportCSV();
            }
        }
        this.setState({ exportCSV: !exportCSV })
        // const {withdrawalStatementData}= this.props;
        // const withdrawals = withdrawalStatementData.details;
        // console.log("export csv: " + withdrawals);
    }
}

const styles = {
    icon: {
        width: 40,
        height: 40,
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        bankAuthenticationData: state.bankAuthenticationData,
        withdrawals: state.withdrawalStatementData.details
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getBankAuthentication: () => {
            dispatch(getBankAuthentication(bankCode, branch, type, account, pin))
        }
    }
}

const options = {
    withRef: true,
}
export default connect(mapStateToProps, mapDispatchToProps, null, options)(Dimensions({ containerStyle: { display: 'inline-block', width: '100%' } })(Passbook))