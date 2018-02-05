import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import _ from 'lodash';

import PostgapTable from './PostgapTable';

function transformEvidenceString(r) {
    return {
        efoId: r.disease.id,
        efoName: r.disease.name,
        gwasPValue: r.evidence.variant2disease.resource_score.value,
        gwasSampleSize: r.evidence.variant2disease.gwas_sample_size,
        gwasSnpId: r.evidence.variant2disease.lead_snp_rsid,
        r2: parseFloat(r.unique_association_fields.r2),
        ldSnpId: r.variant.id.split('/')[4],
        gtex: r.evidence.gene2variant.metadata.funcgen.gtex_score,
        pchic: r.evidence.gene2variant.metadata.funcgen.pchic_score,
        dhs: r.evidence.gene2variant.metadata.funcgen.dhs_score,
        fantom5: r.evidence.gene2variant.metadata.funcgen.fantom5_score,
        vep: r.evidence.gene2variant.metadata.funcgen.vep_score,
        otScore: r.evidence.gene2variant.metadata.funcgen.ot_g2v_score,
        geneName: r.target.target_name,
    }
}

class PostgapScene extends Component {
    constructor(props) {
      super(props);
      this.loadEvidenceStrings = this.loadEvidenceStrings.bind(this);
      this.state = {
        evidenceStrings: [],
        // gtexBins: [],
      }
    }
  
    loadEvidenceStrings(entities) {
      console.log('loadEvidenceStrings')
      const targets = entities.filter(d => (d.type === 'target')).map(d => d.id)
      const diseases = entities.filter(d => (d.type === 'disease')).map(d => d.id)
      console.log(entities);
      console.log(targets);
      console.log(diseases);
      // const variants = entities.filter(d => (d.type === 'variant')).map(d => d.id)
      const query = {
        size: 1000,
        datasource: 'gwas_catalog',
        fields: ['unique_association_fields', 'disease', 'evidence', 'variant', 'target', 'sourceID'],
        expandefo: true,
        target: targets,
        disease: diseases
      }
      const url = `https://master-dot-open-targets-eu-dev.appspot.com/v3/platform/public/evidence/filter?${queryString.stringify(query)}`;
      console.log(url);
      // axios.get('https://master-dot-open-targets-eu-dev.appspot.com/v3/platform/public/evidence/filter?size=1000&datasource=gwas_catalog&datasource=phewas_catalog&fields=unique_association_fields&fields=disease&fields=evidence&fields=variant&fields=target&fields=sourceID&fields=access_level&target=ENSG00000172057&disease=EFO_0000270&expandefo=true')
      axios.get(url)
        .then(response => {
            // console.log(response)
            const data = response.data.data.map(transformEvidenceString);
            this.setState({evidenceStrings: data})
        })
    }
  
    componentDidMount() {
      this.loadEvidenceStrings(this.props.entities);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.entities, nextProps.entities)) {
            this.loadEvidenceStrings(nextProps.entities);
        }
    }
  
    render() {
      if (this.props.entities.length > 0) {
        // return 'Boo'
        return <PostgapTable data={this.state.evidenceStrings} />
      } else {
        return 'Ha'
      }
    }
  }

export default PostgapScene;
