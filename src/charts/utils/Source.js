import React, { Component } from 'react';

class Source extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <text className='Source' x={this.props.x} y={this.props.y}>
                {this.props.children}
            </text>
        )
    }
}
Source.defaultProps = {
    x: 0,
    y: 0
}

export default Source;
