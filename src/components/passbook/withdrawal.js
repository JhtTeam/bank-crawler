import React, { Component } from 'react';
import { getWithdrawalStatementInquiry } from './actions';
import { connect } from 'react-redux';
// import { withdrawalStatementData } from '../../mock';
import Snackbar from 'material-ui/Snackbar';

import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Grid from 'react-virtualized/dist/commonjs/Grid'
import cn from 'classnames';
import Dimensions from 'react-dimensions';

import './withdrawal.css';

class Withdrawal extends Component {
    constructor(props) {
        super(props);
        const { accessToken } = this.props;
        this.props.loadWithdrawalStatement(accessToken);
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log("Withdrawal... componentWillUpdate : " + JSON.stringify(nextProps));
        // Check for your update condition however you need to...
        if (nextProps.containerWidth !== this.props.containerWidth) {
            console.log(this.refs);
            const GridRef = this.refs.AutoSizer.refs.Grid;
            if (GridRef) {
                GridRef.recomputeGridSize()
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const accessToken = this.props.accessToken;
        const nextAccessToken = nextProps.accessToken;
        if (nextAccessToken && accessToken !== nextAccessToken) {
            this.props.loadWithdrawalStatement(nextAccessToken);
        }
    }
    render() {
        console.log("Withdrawal... render");
        const { withdrawalStatementData } = this.props;
        const withdrawals = withdrawalStatementData.details;
        const error = withdrawalStatementData.error;

        if (withdrawals && withdrawals.length > 0) {
            return (
                <AutoSizer disableHeight ref="AutoSizer">
                    {({ width, height }) => {
                        console.log("Withdrawal.... " + width + " - " + height);
                        const cell1Width = width * 0.12 | 0;
                        const cellWidth = width * 0.22 | 0;
                        const lastCellWidth = width - cell1Width - 3 * cellWidth;
                        console.log(cell1Width + " - " + cellWidth + " -- " + lastCellWidth);
                        return (
                            <Grid
                                ref='Grid'
                                cellRenderer={({ columnIndex, key, rowIndex, style }) => {
                                    return this._cellRenderer({ columnIndex, key, rowIndex, style, withdrawals })
                                } }
                                columnWidth={({index}) => {
                                    console.log("columnWidth... ")
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
        } else if (error) {
            return (
                <div>
                    <Snackbar
                        open={true}
                        message={error}
                        autoHideDuration={4000}
                        />
                </div>
            );
        }
        return (
            <div>

            </div>
        );
    }

    _getRowHeight({ index }) {
        return (index === 0) ? 27 : 40;
    }

    _cellRenderer({ columnIndex, key, rowIndex, style, withdrawals }) {
        var classNames = "";
        var text = "";
        if (rowIndex === 0) {
            classNames = cn("centeredCell", "headerCell");
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
            classNames = cn("evenRow", "cell", "centeredCell");
            if (rowIndex % 2 === 0) {
                classNames = cn("oddRow", "cell", "centeredCell");
            }
            const data = withdrawals[rowIndex - 1];
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
                    if (text === "0") {
                        return (<div className={classNames} key={key} style={style}></div>);
                    } else {
                        return (
                            <div className={classNames} key={key} style={style}>
                                <NumberFormat value={text} displayType={'text'} thousandSeparator={true} prefix={'¥'} />
                            </div>
                        );
                    }

                case 3:
                    text = data["receipt"];
                    if (text === "0") {
                        return (<div className={classNames} key={key} style={style}></div>);
                    } else {
                        return (
                            <div className={classNames} key={key} style={style}>
                                <NumberFormat value={text} displayType={'text'} thousandSeparator={true} prefix={'¥'} />
                            </div>
                        );
                    }
                default:
                    text = data["balance"];
                    if (text === "0") {
                        return (<div className={classNames} key={key} style={style}></div>);
                    } else {
                        return (
                            <div className={classNames} key={key} style={style}>
                                <NumberFormat value={text} displayType={'text'} thousandSeparator={true} prefix={'¥'} />
                            </div>
                        );
                    }
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
    const { bankCode, branch, type, account } = ownProps;
    return {
        loadWithdrawalStatement: (accessToken) => {
            dispatch(getWithdrawalStatementInquiry(accessToken, bankCode, branch, type, account))
        }
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal);
export default connect(mapStateToProps, mapDispatchToProps)(Dimensions({containerStyle: { display: 'inline-block', width: '100%' }})(Withdrawal))