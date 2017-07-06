import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

var ArrowBack = (props) => (
    <SvgIcon {...props}>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="passbook" transform="translate(-15.000000, -17.000000)" fill="#7ED321">
            <g id="title" transform="translate(0.000000, 6.000000)">
                <polygon id="Disclosure-Indicator" transform="translate(19.923077, 19.000000) scale(-1, 1) translate(-19.923077, -19.000000) " points="15 12.8461538 16.8461538 11 24.8461538 19 16.8461538 27 15 25.1538462 21.1538462 19"></polygon>
            </g>
        </g>
    </g>
    </SvgIcon>
)

ArrowBack = pure(ArrowBack);

export default ArrowBack;