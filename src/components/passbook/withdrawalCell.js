import React, { Component } from 'react';
import { Cell } from 'react-data-grid';

class WithdrawalCell extends Component {
    render() {
        return (
            <div style={this.getCellStyle()}>
                <Cell ref={node => this.row = node} {...this.props} />
            </div>
        );
    }

    getCellStyle() {
        return {
            color: this.getCellBackground()
        };
    }

    getCellBackground() {
        return this.props.idx === 1 ? '#FD4520' : 'black';
    }
}

export default WithdrawalCell;