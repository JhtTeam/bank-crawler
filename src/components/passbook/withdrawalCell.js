import React, { Component } from 'react';
import { Cell } from 'react-data-grid';
import './withdrawalCell.css';

class WithdrawalCell extends Component {
    render() {
        console.log(this.props);
        return (
            <div style={this.getCellStyle()}>
                <Cell ref={node => this.row = node} {...this.props} className="WithdrawalCell"/>
            </div>
        );
    }

    getCellStyle() {
        return {
            color: this.getCellBackground(),
            fontSize: this.getFontSize(),
        };
    }

    getCellBackground() {
        return this.props.idx === 1 ? '#FD4520' : 'black';
    }

    getFontSize() {
        switch(this.props.idx) {
            case 0: 
                return 11;
            case 1: 
                return 12;
            default: 
                return 14;
        }
    }
}

export default WithdrawalCell;