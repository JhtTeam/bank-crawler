import React, { Component } from 'react';
import './income.css';

class Income extends Component {
    render() {
        const { income } = this.props;
        return (
            <div className="income">
                <span className="circle-income">入</span>
                <span className="value">{income}</span>
                
            </div>
        );
    }
}

export default Income;