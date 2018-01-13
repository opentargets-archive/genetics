import React, { Component } from 'react';

class Title extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <text className='Title' x={this.props.x} y={this.props.y}>
                {this.props.children}
            </text>
        )
    }
}
Title.defaultProps = {
    x: 0,
    y: 0
}

export default Title;
