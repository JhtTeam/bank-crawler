import React, { Component } from 'react';
import Income from './income';
import Outcome from './outcome';
import './event.css';

class Event extends Component {
    render() {
        const { event } = this.props;
        return (
            <div>
                <span className="event-title">{event.title}</span>
                <Income income={event.income} />
                <Outcome outcome={event.outcome} />
            </div>
        );
    }
}

export default Event;