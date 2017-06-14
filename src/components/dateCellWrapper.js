import React, { Component } from 'react';

class DateCellWrapper extends Component {
    
    render() {
        console.log(this.props);
        return (
            <div>
                {this.props.childrens}
            </div>
        );
    }
}

export default DateCellWrapper;