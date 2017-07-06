import React, { Component } from 'react';
import { getWithdrawalStatementInquiry } from './actions';
import { connect } from 'react-redux';
// import { withdrawalStatementData } from '../../mock';
import Snackbar from 'material-ui/Snackbar';

import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
import moment from 'moment';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Grid from 'react-virtualized/dist/commonjs/Grid'
import cn from 'classnames';
import Dimensions from 'react-dimensions';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { buildURI } from '../../csv/core';

import './withdrawal.css';

class Withdrawal extends Component {
    state = {
        itemChecked: {},
    }
    constructor(props) {
        super(props);
        const { accessToken } = this.props;
        this.buildURI = this.buildURI.bind(this);
        this.props.loadWithdrawalStatement(accessToken);
    }

    buildURI() {
        return buildURI(...arguments);
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log("Withdrawal... componentWillUpdate : " + JSON.stringify(nextProps));
        // Check for your update condition however you need to...
        if (nextProps.containerWidth !== this.props.containerWidth || nextProps.exportCSV !== this.props.exportCSV) {
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
        const { withdrawalStatementData, exportCSV} = this.props;
        const withdrawals = withdrawalStatementData.details;
        const error = withdrawalStatementData.error;
        const messageExportCSV = !exportCSV ? null : (
            <div style={{ backgroundColor: '#A00115', color: 'white', padding: 10, fontSize: 14 }}>
                <span>家計簿に送るデータを選択してください。</span><br />
                <span>選択後に右上の“完了”ボタンを押してください。</span>
            </div>
        );
        if (withdrawals && withdrawals.length > 0) {
            return (
                <div style={{ flex: 1, minHeight: this.props.containerHeight }}>
                    {messageExportCSV}
                    <AutoSizer disableHeight ref="AutoSizer">
                        {({ width, height }) => {
                            console.log("Withdrawal.... " + width + " - " + height);
                            return (
                                <Grid
                                    ref='Grid'
                                    cellRenderer={({ columnIndex, key, rowIndex, style }) => {
                                        if (this.props.exportCSV) {
                                            return this._cellExportCSVRenderer({ columnIndex, key, rowIndex, style, withdrawals });
                                        }
                                        return this._cellRenderer({ columnIndex, key, rowIndex, style, withdrawals })
                                    } }
                                    columnWidth={exportCSV ? this._getColumnWidthExportCSV.bind(this) : this._getColumnWidth.bind(this)}
                                    columnCount={this._getColumnCount()}
                                    height={height}
                                    rowHeight={this._getRowHeight.bind(this)}
                                    rowCount={withdrawals.length + 1}
                                    width={width}
                                    className="Grid"
                                    />
                            );
                        } }
                    </AutoSizer>
                </div>
            );
        } else if (error) {
            return (
                <div>
                    
                </div>
            );
        }
        return (
            <div>

            </div>
        );
    }

    _getColumnWidth({index}) {
        const width = this.props.containerWidth;
        const cell1Width = width * 0.12 | 0;
        const cellWidth = width * 0.22 | 0;
        const lastCellWidth = width - cell1Width - 3 * cellWidth;
        console.log(cell1Width + " - " + cellWidth + " -- " + lastCellWidth);
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
    }
    _getColumnWidthExportCSV({index}) {
        const width = this.props.containerWidth;
        const cell1Width = width * 45 / 414 | 0;
        const cell2Width = cell1Width;
        const cell3Width = width * 75 / 414 | 0;
        const cellWidth = width * 85 / 414 | 0;
        const lastCellWidth = width - cell1Width - cell2Width - cell3Width - 2 * cellWidth;
        console.log(cell1Width + " - " + cellWidth + " -- " + lastCellWidth);
        switch (index) {
            case 0:
                return cell1Width;
            case 1:
                return cell2Width;
            case 2:
                return cell3Width;
            case 3:
                return cellWidth;
            case 4:
                return cellWidth;
            default:
                return lastCellWidth;
        }
    }

    _getColumnCount() {
        console.log("_getColumnCount: " + this.props.exportCSV);
        console.log(this.props.containerWidth);
        return this.props.exportCSV ? 6 : 5;
    }

    exportCSV() {
        console.log("withdrawal... export csv");
        const { withdrawalStatementData, exportCSV} = this.props;
        const { itemChecked } = this.state;
        console.log(itemChecked);
        const withdrawals = withdrawalStatementData.details;
        const headers = ["DATE", "TIME", "CATEGORY", "CURRENCY", "PRICE", "MEMO", "PAYMENT", "SHOP", "LABEL", "INCOME"];
        var csvData = [];
        const time = "00:00:00";
        const category = "";
        const currency = "¥";
        const payment = "";
        const shop = "";
        const label = "";
        const keys = Object.keys(itemChecked);
        if (keys.length > 0) {
            keys.map((item) => {
                const data = itemChecked[item];
                console.log(data);
                const date = data.date;
                const memo = data.abridgement;
                if (data.payment !== "0") {
                    csvData.push([date, time, category, currency, data.payment, memo, payment, shop, label, "NO"]);
                }
                if (data.receipt !== "0") {
                    csvData.push([date, time, category, currency, data.receipt, memo, payment, shop, label, "YES"]);
                }
            })
            window.open(
                this.buildURI(csvData, headers), '_blank'
            );
            this.setState({ itemChecked: {} });
        }

    }

    _getRowHeight({ index }) {
        return (index === 0) ? 27 : 40;
    }


    _cellRenderer({ columnIndex, key, rowIndex, style, withdrawals }) {
        if (rowIndex === 0) {
            const header = this._headerRenderer({ columnIndex, key, rowIndex, style, withdrawals });
            return header;
        } else {
            var classNames = "";
            var text = "";

            classNames = cn("evenRow", "cell");
            if (rowIndex % 2 === 0) {
                classNames = cn("oddRow", "cell");
            }
            const data = withdrawals[rowIndex - 1];
            switch (columnIndex) {
                case 0:
                    text = moment(data["date"], "YYYY MM-DD").format("YYYY MM-DD");
                    classNames = cn(classNames, "dateCell");
                    return this._textCell({ classNames, key, text, style });
                case 1:
                    text = data["abridgement"];
                    classNames = cn(classNames, "abridgementCell");
                    return this._textCell({ classNames, key, text, style });
                case 2:
                    text = data["payment"];
                    return this._numberCellCell({ classNames, key, text, style });
                case 3:
                    text = data["receipt"];
                    return this._numberCellCell({ classNames, key, text, style });
                default:
                    text = data["balance"];
                    return this._numberCellCell({ classNames, key, text, style });
            }

        }
    }

    _cellExportCSVRenderer({ columnIndex, key, rowIndex, style, withdrawals }) {
        if (rowIndex === 0) {
            const header = this._headerRenderer({ columnIndex, key, rowIndex, style, withdrawals });
            return header;
        } else {
            var classNames = "";
            var text = "";

            classNames = cn("evenRow", "cell", "centeredCell");
            if (rowIndex % 2 === 0) {
                classNames = cn("oddRow", "cell", "centeredCell");
            }
            const dataIndex = rowIndex - 1;
            const data = withdrawals[dataIndex];
            switch (columnIndex) {
                case 0:
                    return (
                        <div className={classNames} style={style} key={key}>
                            <Checkbox
                                checked={this.state.itemChecked[dataIndex] ? true : false}
                                onCheck={({event, isInputChecked}) => {
                                    const { itemChecked } = this.state;
                                    if (itemChecked[dataIndex]) {
                                        itemChecked[dataIndex] = null;
                                    } else {
                                        itemChecked[dataIndex] = withdrawals[dataIndex];
                                    }
                                    console.log(itemChecked);
                                    this.setState({ itemChecked: Object.assign({}, itemChecked) });
                                } }
                                />
                        </div>
                    );
                case 1:
                    text = moment(data["date"], "YYYY MM-DD").format("YYYY MM-DD");
                    classNames = cn(classNames, "dateCell", "cellSmall");
                    return this._textCell({ classNames, key, text, style });
                case 2:
                    text = data["abridgement"];
                    classNames = cn(classNames, "abridgementCell", "abridgementCellSmall");
                    return this._textCell({ classNames, key, text, style });
                case 3:
                    text = data["payment"];
                    return this._numberCellCell({ classNames, key, text, style });
                case 4:
                    text = data["receipt"];
                    return this._numberCellCell({ classNames, key, text, style });
                default:
                    text = data["balance"];
                    return this._numberCellCell({ classNames, key, text, style });
            }

        }
    }

    _textCell({ classNames, key, style, text }) {
        return (
            <div className={classNames} key={key} style={style}>
                {text}
            </div>
        );
    }

    _numberCellCell({ classNames, key, style, text }) {
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

    _headerRenderer({ columnIndex, key, rowIndex, style }) {
        const { exportCSV } = this.props;
        var classNames = cn("headerCell");
        if (exportCSV) {
            classNames = cn(classNames, "headerCellExportCSV");
        }
        const headers = exportCSV ? ["選択", "日付", "お取引内容", "お支払い", "お預かり", "差引残高"] : ["日付", "お取引内容", "お支払い", "お預かり", "差引残高"];
        const text = headers[columnIndex];
        return this._textCell({ classNames, key, text, style });
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
            console.log("loadWithdrawalStatement");
            dispatch(getWithdrawalStatementInquiry(accessToken, bankCode, branch, type, account))
        }
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal);
const options = {
    withRef: true,
}
export default connect(mapStateToProps, mapDispatchToProps, null, options)(Dimensions({ containerStyle: { display: 'inline-block', width: '100%' } })(Withdrawal))