import React, { Component } from 'react';
import { VictoryLine, VictoryZoomContainer, VictoryAxis, VictoryBrushContainer, VictoryChart } from 'victory';
import GeneTrack from './GeneTrack';
import VariantTrack from './VariantTrack';

// temporary!
import { ensemblTranscripts } from './temp';
import { postgapResponse } from './temp2';

class GenomeCoordinateChart extends React.Component {

    constructor() {
      super();
      this.state = {
        chr: 1,
        chrLength: 249250621,
        location: {
          start: 109167885,
          end: 109612066,
        }
      };
    }
  
    handleZoom(domain) {
      let start = Math.round(domain.x[0]);
      let end = Math.round(domain.x[1]);
      if (start < 0) start = 0;
      if (end > this.state.chrLength) end = this.state.chrLength;
      this.setState({ location: { start, end } });
    }
  
    render() {
      const { start, end } = this.state.location

      
      return (
        <div>
            {/* <VictoryChart width={900} height={350} scale={{x: "linear"}} domain={{x: [0, this.state.chrLength]}}
              containerComponent={
                <VictoryZoomContainer responsive={false}
                  zoomDimension="x"
                  zoomDomain={{x: [start, end]}}
                  onZoomDomainChange={this.handleZoom.bind(this)}
                />
              }
            >
              <VictoryLine
                style={{
                  data: {stroke: "tomato"}
                }}
                data={[
                  {x: 109167885, y: 125},
                  {x: 109197885, y: 257},
                  {x: 109267885, y: 345},
                  {x: 109297885, y: 515},
                  {x: 109467885, y: 132},
                  {x: 109477885, y: 305},
                  {x: 109489885, y: 270},
                  {x: 109567885, y: 470}
                ]}
              />
            </VictoryChart> */}

            <GeneTrack location={this.state.location}
                chrLength={this.state.chrLength}
                handleZoom={this.handleZoom.bind(this)}
                data={ensemblTranscripts}
            />

            <VariantTrack location={this.state.location}
                chrLength={this.state.chrLength}
                handleZoom={this.handleZoom.bind(this)}
            />

        </div>
      );
    }
}

export default GenomeCoordinateChart;
