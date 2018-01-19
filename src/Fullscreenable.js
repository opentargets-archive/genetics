import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';

class Fullscreenable extends React.Component {
    className() {
        return `${this.props.isFullscreen ? 'fullscreen' : ''} ${!this.props.isVisible ? 'hidden' : ''}`
    }
    render() {
        return (
            <Card className={this.className()}>
                <Card.Content>
                    <Card.Header className='right aligned'>
                        <Button size='small' basic icon onClick={() => {this.props.isFullscreen ? this.props.viewFullscreen(null) : this.props.viewFullscreen(this.props.id)}}>
                            <Icon fitted name={this.props.isFullscreen ? 'expand' : 'compress'} />
                        </Button>
                    </Card.Header>
                    {this.props.children}
                </Card.Content>
            </Card>
        );
    }
}

export default Fullscreenable;
