import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

class Fullscreenable extends React.Component {
    className() {
        return `${this.props.isFullscreen ? 'fullscreen' : ''} ${!this.props.isVisible ? 'hidden' : ''}`
    }
    render() {
        return (
            <Card className={this.className()}>
                <Card.Content>
                    <Button onClick={() => {this.props.isFullscreen ? this.props.viewFullscreen(null) : this.props.viewFullscreen(this.props.id)}}>
                        {this.props.isFullscreen ? 'Go small!' : 'Go big!'}
                    </Button>
                    {this.props.children}
                </Card.Content>
            </Card>
        );
    }
}

export default Fullscreenable;
