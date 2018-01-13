import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Menu from './Menu';

import 'semantic-ui-css/semantic.min.css';
import PostgapTable from './tables/PostgapTable';

import { Card, Label, Statistic } from 'semantic-ui-react';
import * as V from 'victory';
import PostgapChart from './charts/PostgapChart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Card.Group itemsPerRow={2}>
          <Card>
            {/* <Card.Title>
              Key
            </Card.Title> */}
            <Card.Content align={'left'}>
            <Label basic size={'mini'} color='blue'>Blue</Label>
            <Label color='blue'>Blue</Label>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <Statistic>
                <Statistic.Value>5,550</Statistic.Value>
                <Statistic.Label>Diseases</Statistic.Label>
              </Statistic>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <V.VictoryChart
                    containerComponent={
                        <V.VictoryBrushContainer
                        brushDimension="x"
                        brushDomain={{x: [0, 1]}}
                        />
                    }
                    >
                    <V.VictoryBar 
                        data={[
                            {x: 0, y: 5},
                            {x: 0.1, y: 6},
                            {x: 0.3, y: 4.5},
                            {x: 0.6, y: 7},
                            {x: 0.9, y: 2},
                        ]}
                    />
                </V.VictoryChart>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <V.VictoryChart domainPadding={20} theme={V.VictoryTheme.material}>
                <V.VictoryAxis
                  label={'2017'}
                  tickValues={[1, 2, 3, 4]}
                  tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                />
                <V.VictoryAxis
                  dependentAxis
                  tickFormat={(x) => (`$${x}k`)}
                />
                <V.VictoryBar />
              </V.VictoryChart>
            </Card.Content>
          </Card>





          <Card>
            <Card.Content>
              <PostgapChart />
            </Card.Content>
          </Card>




          

        </Card.Group>

        <Card fluid>
          <Card.Content>
            <PostgapTable />
          </Card.Content>
        </Card>

        {/* <Menu /> */}
        
      </div>
    );
  }
}

export default App;
