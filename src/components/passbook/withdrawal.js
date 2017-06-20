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

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Grid from 'react-virtualized/dist/commonjs/Grid'
import cn from 'classnames';
import styles from './withdrawal.css';

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

const rowHeight = 40;

class Withdrawal extends Component {

    render() {
        // const { withdrawalStatementData } = this.props;
        const withdrawals = withdrawalStatementData.details;
        // const withdrawals = require('../')
        // const columns = this._getColumns();
        // console.log(withdrawals);

        if (withdrawals && withdrawals.length > 0) {
            return (
                <AutoSizer disableHeight>
                    {({ width, height }) => {
                        console.log(width + " - " + height);
                        return (
                            <Grid
                                cellRenderer={this._cellRenderer}
                                columnWidth={({index}) => {
                                    console.log(width);
                                    const cell1Width = width * 0.12 | 0;
                                    const cellWidth = width * 0.22 | 0;
                                    const lastCellWidth = width - cell1Width - 3 * cellWidth;
                                    switch (index) {
                                        case 0:
                                            return cell1Width;
                                        case 1:
                                            return cellWidth;
                                        case 2:
                                            return cellWidth;
                                        case 3:
                                            return cellWidth;
                                        default:
                                            return lastCellWidth;
                                    }
                                } }
                                columnCount={5}
                                height={height}
                                rowHeight={40}
                                rowCount={withdrawals.length}
                                width={width}
                                className="Grid"
                                />
                        );
                    } }
                </AutoSizer>
            );
        }
        return (
            <div>

            </div>
        );
    }
    _cellRenderer({ columnIndex, key, rowIndex, style }) {
        var classNames = cn("evenRow", "cell", "centeredCell");
        const withdrawals = withdrawalStatementData.details;
        const data = withdrawals[rowIndex];
        // console.log(data);
        var text = "";
        switch (columnIndex) {
            case 0:
                text = data["date"];
                classNames = cn(classNames, "dateCell");
                return (
                    <div className={classNames} key={key} style={style}>
                        {text}
                    </div>
                );
            case 1:
                text = data["abridgement"];
                classNames = cn(classNames, "abridgementCell");
                return (
                    <div className={classNames} key={key} style={style}>
                        {text}
                    </div>
                );
            case 2:
                text = data["payment"];
                return (
                    <div className={classNames} key={key} style={style}>
                        <NumberFormat value={text} displayType={'text'} thousandSeparator={true} prefix={'¥'} />
                    </div>
                );
            case 3:
                text = data["receipt"];
                return (
                    <div className={classNames} key={key} style={style}>
                        <NumberFormat value={text} displayType={'text'} thousandSeparator={true} prefix={'¥'} />
                    </div>
                );
            default:
                text = data["balance"];
                return (
                    <div className={classNames} key={key} style={style}>
                        <NumberFormat value={text} displayType={'text'} thousandSeparator={true} prefix={'¥'} />
                    </div>
                );
        }
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
