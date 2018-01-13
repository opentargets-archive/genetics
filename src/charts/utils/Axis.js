import React, { Component } from 'react'
import { select } from 'd3-selection'
import * as axis from 'd3-axis'

class Axis extends Component {
    constructor(props) {
        super(props);
        this.renderAxis = this.renderAxis.bind(this);
    }

    componentDidMount() {
        this.renderAxis()
    }

    componentDidUpdate() {
        this.renderAxis()
    }

    renderAxis() {
        const node = this.node;
        const { scale, align } = this.props;
        const generator = axis[`axis${align}`]().scale(scale);
        select(node)
            .call(generator);
    }

    render() {
        return <g ref={node => this.node = node}
                className='Axis'
                transform={`translate(${this.props.translation[0]},${this.props.translation[1]})`}
            />
    }
}
Axis.defaultProps = {
    translation: [0, 0],
    align: 'Left'
}

export default Axis;
