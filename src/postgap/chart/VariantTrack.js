import React, { Component } from 'react';
import { VictoryLine, VictoryZoomContainer, VictoryAxis, VictoryBrushContainer, VictoryChart } from 'victory';

class VariantTrack extends React.Component {
  
    render() {
      const { start, end } = this.props.location;
      const chrLength = this.props.chrLength;
      const handleZoom = this.props.handleZoom;
      return (
        <div>
            <VictoryChart width={900} height={350} scale={{x: "linear"}} domain={{x: [0, chrLength]}}
              containerComponent={
                <VictoryZoomContainer responsive={false}
                  zoomDimension="x"
                  zoomDomain={{x: [start, end]}}
                  onZoomDomainChange={handleZoom}
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
            </VictoryChart>
        </div>
      );
    }
}

export default VariantTrack;
