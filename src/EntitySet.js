import React, { Component } from 'react';

class EntitySet extends React.Component {
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

        const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, { viewFullscreen: this.viewFullscreen }));

        // return <div>{childrenWithProps}</div>

        // return (this.state.fullscreenComponent ? this.state.fullscreenComponent : this.props.children);
        // console.log(this.state.fullscreenComponent);
        return (this.state.fullscreenComponent ? (this.state.fullscreenComponent) : childrenWithProps);
    }
}

export default EntitySet
