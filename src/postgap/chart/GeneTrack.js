import React, { Component } from 'react';
import { VictoryLine, VictoryBar, VictoryScatter, VictoryZoomContainer, VictoryAxis, VictoryBrushContainer, VictoryChart } from 'victory';
import { addEvents } from 'victory-core';

import VictoryGene from './VictoryGene';

class Gene extends React.Component {
    render () {
        console.log(this.props);
        const { x, y } = this.props.scale;
        const d = this.props.data;
        const canonical = d.Transcript.filter(t => (t.is_canonical === 1))[0]
        const exonHeight = 10;
        return (
            <g className='Gene'>
                <line className='Gene--spit' x1={x(d.start)} y1={y(0)} x2={x(d.end)} y2={y(0)} />
                {canonical.Exon.map(exon => <rect key={exon.id} className='Gene--exon' x={x(exon.start)} y={y(0) - exonHeight / 2} width={x(exon.end) - x(exon.start)} height={exonHeight}/>)}
            </g>
        )
    }
}

// Gene = addEvents(Gene);


class GeneTrack extends React.Component {
  
    render() {
        console.log(this.props)
        // console.log(this.props.data)
        // const genes = Object.values(this.props.data);
      const { start, end } = this.props.location;
      const chrLength = this.props.chrLength;
      const handleZoom = this.props.handleZoom;

    //   const canonicals = Object.values(this.props.data).map(d => {
    //       const { Transcript, ...rest } = d;
    //       const canonical = Transcript.filter(t => (t.is_canonical === 1))[0]
    //       return {
    //         canonical,
    //         ...rest,
    //       }
    //   })
    //   console.log(canonicals);
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

              {/* {Object.values(this.props.data).map(d => <Gene key={d.id} data={d} />)} */}
              <VictoryGene data={Object.values(this.props.data)} />


              {/* {Object.values(this.props.data).map(d => {
                return <VictoryBar key={d.id} data={d} />
              })} */}
                {/* <VictoryBar key={d => d.id}
                    data={canonicals}
                    x={d => d.canonical.start}
                    y={0}
                    width={d => {return (d.canonical.end - d.canonical.start)}}
                /> */}

              {/* <VictoryScatter 
                data={this.props.data}
                dataComponent={Gene}
              /> */}

              {/* <VictoryLine
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
              /> */}
            </VictoryChart>
        </div>
      );
    }
}

export default GeneTrack;
