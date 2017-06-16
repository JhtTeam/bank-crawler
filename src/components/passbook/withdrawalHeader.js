import React, { Component } from 'react';

export default function  WithdrawalHeader(props) {
    return (
            <div style={{color: '#FD4520'}}>
                {props.column.name}
            </div>
        );
}