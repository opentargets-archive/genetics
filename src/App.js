import React, { Component } from 'react';
// import logo from './logo.svg';
import logo from './images/open-targets-logo.svg';
import './App.css';

// import Menu from './Menu';
import { Menu, Image } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
// import PostgapTable from './tables/PostgapTable';
import PostgapTableRedux from './tables/PostgapTableRedux';

import { Card, Label, Statistic, Container, Header } from 'semantic-ui-react';
import * as V from 'victory';
import PostgapChart from './charts/PostgapChart';
import EntitySearch from './EntitySearch';
import EntitySelect from './EntitySelect';
import EntitySet from './EntitySet';
import Fullscreenable from './Fullscreenable';
import FullscreenableGroup from './FullscreenableGroup';
import BrowserChart from './charts/BrowserChart';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './store/reducers/postgap.js';
import GenomeCoordinateChart from './postgap/chart/GenomeCoordinateChart';
// import PostgapTable from './tables/PostgapTable';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import queryString from 'query-string';

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

const TestRouting = ({ match, location }) => {
  console.log(match);
  console.log(location);
  console.log(queryString.parse(location.search))
  return (
    <div>Yoohoo!</div>
  )
}

const Menuet = () => (
<Menu inverted attached>
  {/* <Container text> */}
    <Menu.Item>
      <Image size='mini' src={logo} />
    </Menu.Item>
    <Menu.Item header>
      Open Targets Genetics
    </Menu.Item>    
    <Menu.Item style={{flexGrow: 1}}>
      <Container fluid>
        <EntitySelect />
      </Container>
    </Menu.Item>
  {/* </Container> */}
</Menu>  
)

class App extends Component {
  render() {
    return (
      // <div>
      // <h1>Boo!</h1>
      <Router>
      {/* <Root> */}
      {/* // <Provider store={store}> */}
      <Menuet />
      {/* <div className="App">

      </div> */}
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. 
          <Link to={`/postgap/ENSG01?foo=bar`}>Postgap</Link>
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. 
          <Link to={{pathname:'/postgap/ENSG01', search:'?foo=bar2', state: {x: 3}}}>Postgap</Link>
        </p>
        <Route path='/postgap/:geneId' component={TestRouting} /> */}


        {/* <Card fluid>
            <Card.Content align={'left'}>
              <EntitySelect />
            </Card.Content>
          </Card>

          <Card fluid>
            <Card.Content>
              <GenomeCoordinateChart />
            </Card.Content>
          </Card> */}

      {/* </div> */}
      {/* </Root> */}
      </Router>
      // </div>
          
    );
  }
}

export default App;
