import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class EntitySelect extends React.Component {
    constructor(props) {
      super(props);
      this.fetchEntities = debounce(this.fetchEntities, 800);
        // this.fetchEntities = this.fetchEntities.bind(this);
        // this.loadOptions = debounce(this.loadOptions, 800);
        this.onChange = this.onChange.bind(this);
    }
    state = {
      data: [],
      value: [],
      fetching: false,
    }
    onChange (value) {
        console.log(value)
		this.setState({
			value: value,
		});
	}
    render() {
        return <Select.Async 
            multi={true}
            value={this.state.value}
            onChange={this.onChange}
            // onValueClick={this.gotoContributor}
            autoload={false}
            valueKey="id"
            labelKey="name"
            loadOptions={this.fetchEntities}
        />
    }
    // loadOptions = (value, callback) => {
    //     this.
    //     // setTimeout(() => {
    //       callback(null, {
    //         options: [
    //           { value: 'one', label: 'One' },
    //           { value: 'two', label: 'Two' }
    //         ],
    //         // CAREFUL! Only set this to true when there are no more options,
    //         // or more specific queries will not be sent to the server.
    //         complete: true
    //       });
    //     // }, 500);
    //   }
    fetchEntities = (value, callback) => {
        this.setState({ data: [], fetching: true });
        axios.all([
          axios.get(`https://api.opentargets.io/v3/platform/private/quicksearch?q=${value}&size=3`).catch(error => (Promise.resolve({error: 'No gene or disease found'}))),
          axios.get(`https://rest.ensembl.org/variation/human/${value}?content-type=application/json`).catch(error => (Promise.resolve({error: 'No SNP found'}))),
        ]).then(responses => {
          const [otResponse, ensemblResponse] = responses;
          console.log(otResponse);
          console.log(ensemblResponse);
          const data = [];
          if (!ensemblResponse.error) {
            const snpInfo = {
              id: ensemblResponse.data.name,
              name: ensemblResponse.data.name,
              type: 'variant',
              chrom: ensemblResponse.data.mappings[0].seq_region_name,
              pos: ensemblResponse.data.mappings[0].start,
              alleleString: ensemblResponse.data.mappings[0].allele_string,
              maf: ensemblResponse.data.MAF,
            }
            data.push(snpInfo)
          }
          if (otResponse.data && otResponse.data.data) {
            if (otResponse.data.data.besthit) {
              data.push({
                id: otResponse.data.data.besthit.data.id,
                name: otResponse.data.data.besthit.data.name,
                type: otResponse.data.data.besthit.data.type,
              })
            }
            if (otResponse.data.data.target) {
              otResponse.data.data.target.forEach(d => {
                data.push({
                  id: d.data.id,
                  name: d.data.name,
                  type: d.data.type,
                })
              })
            }
            if (otResponse.data.data.disease) {
              otResponse.data.data.disease.forEach(d => {
                data.push({
                  id: d.data.id,
                  name: d.data.name,
                  type: d.data.type,
                })
              })
            }
          }
          this.setState({ data, fetching: false });
          callback(null, {
              options: data,
              complete: true,
          })
        })
      }
}

export default EntitySelect