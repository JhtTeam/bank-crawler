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
import moment from 'moment';
import Moment from 'react-moment';
import Dimensions from 'react-dimensions'

import { Table, Column, Cell } from 'fixed-data-table-2';
// import 'fixed-data-table/dist/fixed-data-table.css';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import './withdrawal.css';

const TextCell = ({rowIndex, data, col, style, props}) => {
    return (
        <Cell {...props}>
            <span style={style}>{data[rowIndex][col]}</span>
        </Cell>
    );
};

const HeaderCell = ({ text, style, props }) => {
    return (
        <Cell {...props}>
            <span style={style}>{text}</span>
        </Cell>
    );
};

const PriceCell = ({rowIndex, data, col, style, props}) => {
    return (
        <Cell {...props}>
            <NumberFormat value={data[rowIndex][col]} displayType={'text'} thousandSeparator={true} prefix={'¥'} style={style} />
        </Cell>
    );
}

const DateCell = ({rowIndex, data, col, style, props}) => {
    return (
        <Cell {...props}>
            <Moment format="YYYY MM-DD" style={style}>{data[rowIndex][col]}</Moment>
        </Cell>
    );
}

class Withdrawal extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         windowWidth: window.innerWidth,
    //     }
    // }
    // componentDidMount() {
    //     window.addEventListener("resize", this.updateDimensions.bind(this));
    // }
    // componentWillUnmount() {
    //     window.removeEventListener("resize", this.updateDimensions.bind(this));
    // }
    // updateDimensions(e) {
    //     console.log("updateDimensions.... forceUpdate: " + window.innerWidth);
    //     this.setState(Object.assign({}, this.state, { windowWidth: window.innerWidth }));
    // }
    
    render() {
        // const { withdrawalStatementData } = this.props;
        const withdrawals = withdrawalStatementData.details;
        // const withdrawals = require('../')
        // const columns = this._getColumns();
        // console.log(withdrawals);

        if (withdrawals && withdrawals.length > 0) {
            const windowWidth = this.props.containerWidth;
            const cell1Width = windowWidth * 0.12 | 0;
            const cellWidth = windowWidth * 0.22 | 0;
            const lastCellWidth = windowWidth - cell1Width - 3 * cellWidth;

            console.log(windowWidth + " -- " + cell1Width + " -- " + cellWidth + " -- " + lastCellWidth);
            return (

                <Table
                    rowsCount={withdrawals.length}
                    rowHeight={50}
                    width={windowWidth}
                    headerHeight={27}
                    height={50 * withdrawals.length + 52}>
                    <Column
                        columnKey="date"
                        header={<HeaderCell text="日付" style={styleHeader} />}
                        cell={<DateCell data={withdrawals} col="date" style={{ fontSize: 11 }} />}
                        fixed={true}
                        width={cell1Width}
                        align="center"
                        allowCellsRecycling={true}
                        />
                    <Column
                        header={<HeaderCell text="お取引内容" style={styleHeader} />}
                        cell={<TextCell data={withdrawals} col="abridgement" style={{ color: '#FD4520', fontSize: 12 }} />}
                        width={cellWidth}
                        align="center"
                        />
                    <Column
                        header={<HeaderCell text="お支払い" style={styleHeader} />}
                        cell={<PriceCell data={withdrawals} col="payment" style={{ fontSize: 14 }} />}
                        width={cellWidth}
                        align="center"
                        />
                    <Column
                        header={<HeaderCell text="お預かり" style={styleHeader} />}
                        cell={<PriceCell data={withdrawals} col="receipt" style={{ fontSize: 14 }} />}
                        width={cellWidth}
                        align="center"
                        />
                    <Column
                        header={<HeaderCell text="差引残高" style={styleHeader} />}
                        cell={<PriceCell data={withdrawals} col="balance" style={{ fontSize: 14 }} />}
                        width={lastCellWidth}
                        align="center"
                        />
                </Table>
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

const styleHeader = {
    color: '#FD4520',
    fontSize: 12,
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

export default connect(mapStateToProps, mapDispatchToProps)(Dimensions()(Withdrawal));
