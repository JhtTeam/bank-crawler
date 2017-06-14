import React, { Component } from 'react';
import './outcome.css';

class Outcome extends Component {
    render() {
        const { outcome } = this.props;
        if (outcome) {
            return (
                <div className="outcome">
                    <span className="circle-outcome">出</span>
                    <span className="value">{outcome}</span>
                </div>
            );
        } else {
            return <div></div>
        }

    }
}

export default Outcome;