import React, { Component } from 'react';
// import { VictoryLine, VictoryZoomContainer, VictoryAxis, VictoryBrushContainer, VictoryChart } from 'victory';
// import GeneTrack from './GeneTrack';
// // import VariantTrack from './VariantTrack';

// // temporary!
// import { ensemblTranscripts } from './temp';
// import { postgapResponse } from './temp2';
// import PostgapChart from '../../../charts/PostgapChart';

import GeneLdSnpFilter from './filters/GeneLdSnpFilter';
import LdSnpLeadSnpFilter from './filters/LdSnpLeadSnpFilter';
import LeadSnpDiseaseFilter from './filters/LeadSnpDiseaseFilter';

class PostgapBrowser extends React.Component {

    // constructor() {
    //   super();
    //   this.state = {
    //     chr: 1,
    //     chrLength: 249250621,
    //     location: {
    //       start: 109167885,
    //       end: 109612066,
    //     }
    //   };
    // }
  
    // handleZoom(domain) {
    //   let start = Math.round(domain.x[0]);
    //   let end = Math.round(domain.x[1]);
    //   if (start < 0) start = 0;
    //   if (end > this.state.chrLength) end = this.state.chrLength;
    //   this.setState({ location: { start, end } });
    // }
  
    render() {
    //   const { start, end } = this.state.location

      
      return (
        <div>

            <GeneLdSnpFilter />
            <LdSnpLeadSnpFilter />
            <LeadSnpDiseaseFilter />

            {/* <GeneTrack location={this.state.location}
                chrLength={this.state.chrLength}
                handleZoom={this.handleZoom.bind(this)}
                data={ensemblTranscripts}
            />

            <VariantTrack location={this.state.location}
                chrLength={this.state.chrLength}
                handleZoom={this.handleZoom.bind(this)}
            /> */}

        </div>
      );
    }
}

export default PostgapBrowser;
