import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import WithdrawalRow from './withdrawalRow';
import WithdrawalHeader from './withdrawalHeader';
import { getWithdrawalStatementInquiry } from './actions';
import { connect } from 'react-redux';
import { withdrawalStatementData } from '../../mock';
import 'bootstrap/dist/css/bootstrap.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NumberFormat from 'react-number-format';
import './withdrawal.css';

class Withdrawal extends Component {
    render() {
        console.log(this.props);
        // const { withdrawalStatementData } = this.props;
        const withdrawals = withdrawalStatementData.details;
        // const withdrawals = require('../')
        // const columns = this._getColumns();
        // console.log(withdrawals);

        if (withdrawals && withdrawals.length > 0) {
            const windowWidth = window.innerWidth;
            const cell1Width = windowWidth * 0.12 | 0;
            const cellWidth = windowWidth * 0.22 | 0;
            const lastCellWidth = windowWidth - cell1Width - 3 * cellWidth;
            console.log(windowWidth + " -- " + cell1Width + " -- " + cellWidth + " -- " + lastCellWidth);
            const borerStyle={ border: '#FD4520 1px solid', textAlign: 'center', verticalAlign: 'middle', minHeight: 44 };
            return (
                <BootstrapTable data={withdrawals} striped hover condensed 
                    tableHeaderClass='withdrawal-header'
                    bodyStyle={{ textAlign: 'center' }}>
                    <TableHeaderColumn 
                        dataField="date" 
                        width={cell1Width}
                        columnClassName="column-date" 
                        isKey={true} 
                        tdStyle={borerStyle} 
                        thStyle={borerStyle}>
                        日付
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="abridgement" 
                        width={cellWidth}
                        columnClassName="column-abridgement" 
                        tdStyle={borerStyle} 
                        thStyle={borerStyle}>
                        お取引内容
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="payment" 
                        width={cellWidth}
                        columnClassName="column" 
                        tdStyle={borerStyle} 
                        thStyle={borerStyle}
                        dataFormat={this.priceFormatter}>
                        お支払い
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="receipt"
                        width={cellWidth} 
                        columnClassName="column" 
                        tdStyle={borerStyle} 
                        thStyle={borerStyle}
                        dataFormat={this.priceFormatter}>
                        お預かり
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="balance"
                        width={lastCellWidth} 
                        columnClassName="column" 
                        tdStyle={borerStyle} 
                        thStyle={borerStyle}
                        dataFormat={this.priceFormatter}>
                        差引残高
                    </TableHeaderColumn>
                </BootstrapTable>
            );
        }
        return (
            <div>

            </div>
        );
    }

    priceFormatter(cell, row) {
        return <NumberFormat value={cell} displayType={'text'} thousandSeparator={true} prefix={'¥'} />
    }
    _getColumns() {
        const windowWidth = window.innerWidth;
        const cell1Width = windowWidth * 0.12;
        const cellWidth = windowWidth * 0.22;
        return [
            // {key: 'date', name: '日付', headerRenderer: WithdrawalHeader},
            // {key: 'abridgement', name: 'お取引内容',  headerRenderer: WithdrawalHeader},
            // {key: 'payment', name: 'お支払い',  headerRenderer: WithdrawalHeader},
            // {key: 'receipt', name: 'お預かり',  headerRenderer: WithdrawalHeader},
            // {key: 'balance', name: '差引残高',  headerRenderer: WithdrawalHeader},

            { key: 'date', name: '日付', width: cell1Width, headerRenderer: WithdrawalHeader },
            { key: 'abridgement', name: 'お取引内容', width: cellWidth, headerRenderer: WithdrawalHeader },
            { key: 'payment', name: 'お支払い', width: cellWidth, headerRenderer: WithdrawalHeader },
            { key: 'receipt', name: 'お預かり', width: cellWidth, headerRenderer: WithdrawalHeader },
            { key: 'balance', name: '差引残高', width: cellWidth, headerRenderer: WithdrawalHeader },
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
