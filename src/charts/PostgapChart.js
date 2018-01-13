import React, { Component } from 'react';
import { random } from 'lodash';
import { range } from 'd3-array';
import { VictoryBar, VictoryChart } from 'victory';

class PostgapChart extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        data: this.getData()
      };
    }
  
    componentDidMount() {
      this.setStateInterval = window.setInterval(() => {
        this.setState({
          data: this.getData()
        });
      }, 3000);
    }
  
    componentWillUnmount() {
      window.clearInterval(this.setStateInterval);
    }
  
    getData() {
      const bars = random(6, 10);
      return range(bars).map((bar) => {
        return {x: bar + 1, y: random(2, 10)};
      });
    }
  
    render() {
      return (
        <VictoryChart
          domainPadding={{ x: 20 }}
          animate={{duration: 500}}
        >
          <VictoryBar
            data={this.state.data}
            style={{
              data: { fill: "tomato", width: 12 }
            }}
            animate={{
              onExit: {
                duration: 500,
                before: () => ({
                  _y: 0,
                  fill: "orange",
                  label: "BYE"
                })
              }
            }}
          />
        </VictoryChart>
      );
    }
  }

export default PostgapChart;
  
//   ReactDOM.render(<App/>, mountNode)



{/* <V.VictoryChart domainPadding={20} theme={V.VictoryTheme.material}>
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
              </V.VictoryChart> */}