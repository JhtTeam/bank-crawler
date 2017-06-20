import React, { Component } from 'react';
import { getWithdrawalStatementInquiry } from './actions';
import { connect } from 'react-redux';
import { withdrawalStatementData } from '../../mock';

import NumberFormat from 'react-number-format';
import moment from 'moment';
import Moment from 'react-moment';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Grid from 'react-virtualized/dist/commonjs/Grid'
import cn from 'classnames';

import './withdrawal.css';

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
                        const cell1Width = width * 0.12 | 0;
                        const cellWidth = width * 0.22 | 0;
                        const lastCellWidth = width - cell1Width - 3 * cellWidth;

                        return (
                            <Grid
                                cellRenderer={this._cellRenderer}
                                columnWidth={({index}) => {
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
                                rowHeight={this._getRowHeight.bind(this)}
                                rowCount={withdrawals.length + 1}
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

    _getRowHeight({ index }) {
        return (index == 0) ? 27 : 40;
    }

    _cellRenderer({ columnIndex, key, rowIndex, style }) {
        if (rowIndex === 0) {
            var classNames = cn("centeredCell", "headerCell");
            var text = "";
            switch (columnIndex) {
                case 0:
                    text = "日付";
                    break;
                case 1:
                    text = "お取引内容";
                    break;
                case 2:
                    text = "お支払い";
                    break;
                case 3:
                    text = "お預かり";
                    break;
                default:
                    text = "差引残高";
                    break;
            }
            return (
                <div className={classNames} style={style} key={key}>
                    {text}
                </div>
            );
        } else {
            var classNames = cn("evenRow", "cell", "centeredCell");
            const data = withdrawalStatementData.details[rowIndex - 1];
            // console.log(data);
            var text = "";
            switch (columnIndex) {
                case 0:
                    text = data["date"];
                    classNames = cn(classNames, "dateCell");
                    return (
                        <div className={classNames} key={key} style={style}>
                            <Moment format="YYYY MM-DD">{text}</Moment>
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

    _headerRenderer({ columnIndex, key, rowIndex, style }) {

    }

    _cellContentRenderer({ columnIndex, key, rowIndex, style }) {

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
