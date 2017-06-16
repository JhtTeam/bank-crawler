import React, { Component } from 'react';
import { Row } from 'react-data-grid';
import WithdrawalCell from './withdrawalCell';

class WithdrawalRow extends Component {
    render() {
        return (
            <Row {...this.props} 
                    cellRenderer={WithdrawalCell}/>
        );
    }
}

export default WithdrawalRow;