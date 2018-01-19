import React, { Component } from 'react';

class FullscreenableGroup extends React.Component {
    constructor(props) {
        super(props);
        this.viewFullscreen = this.viewFullscreen.bind(this);
    }
    state = {
        fullscreenComponent: null,
    }
    viewFullscreen(component) {
        this.setState({fullscreenComponent: component});
    }
    render() {
        const { children } = this.props;
        const childrenWithProps = React.Children.map(children, child => {
            return React.cloneElement(child, {
                isFullscreen: (this.state.fullscreenComponent === child.props.id),
                isVisible: (!this.state.fullscreenComponent || (this.state.fullscreenComponent === child.props.id)),
                viewFullscreen: this.viewFullscreen,
                ...child.props,
            })
        });
        return childrenWithProps;
    }
}

export default FullscreenableGroup
