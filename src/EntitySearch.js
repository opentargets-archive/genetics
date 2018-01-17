import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash.debounce';
import axios from 'axios';
const Option = Select.Option;

class EntitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
    this.fetchEntities = debounce(this.fetchEntities, 800);
  }
  state = {
    data: [],
    value: [],
    fetching: false,
  }
  fetchUser = (value) => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }));
        this.setState({ data, fetching: false });
      });
  }
  fetchEntities = (value) => {
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
    })
  }
  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }
  render() {
    const { fetching, data, value } = this.state;
    return (
      <Select
        mode="multiple"
        labelInValue
        value={value}
        // color={d => (d.type === 'target' ? 'red' : 'blue')}
        
        placeholder="Search for genes, diseases or variants"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchEntities}
        onChange={this.handleChange}
        style={{ width: '100%', color: d => {console.log(d); return 'red'} }}
      >
        {data.map(d => <Option key={d.id}>{d.name}</Option>)}
      </Select>
    );
  }
}

export default EntitySearch;
