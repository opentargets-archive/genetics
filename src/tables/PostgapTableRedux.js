import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';
import _ from 'lodash';
import { histogram } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import { Label } from 'semantic-ui-react';
import { Slider } from 'antd';
import { VictoryBar, VictoryAxis, VictoryChart, VictoryBrushContainer } from 'victory';
import { connect } from 'react-redux';

// get data with POST request to...
// https://master-dot-open-targets-eu-dev.appspot.com/v3/platform/public/evidence/filter?
// with payload...
// {"target":["ENSG00000172057"],"size":1000,"datasource":["gwas_catalog","phewas_catalog"],"fields":["target.gene_info","disease.efo_info","variant","evidence","type"]}
// or GET request to...
// https://master-dot-open-targets-eu-dev.appspot.com/v3/platform/public/evidence/filter?size=1000&datasource=gwas_catalog&datasource=phewas_catalog&fields=unique_association_fields&fields=disease&fields=evidence&fields=variant&fields=target&fields=sourceID&fields=access_level&target=ENSG00000172057&disease=EFO_0000270&expandefo=true

const mapStateToProps = state => {
    return {
        data: state.postgap,
    }
}


class PostgapTable extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data: [],
    //     }
    // }

    // componentDidMount() {
    //     axios.get('https://master-dot-open-targets-eu-dev.appspot.com/v3/platform/public/evidence/filter?size=1000&datasource=gwas_catalog&datasource=phewas_catalog&fields=unique_association_fields&fields=disease&fields=evidence&fields=variant&fields=target&fields=sourceID&fields=access_level&target=ENSG00000172057&disease=EFO_0000270&expandefo=true')
    //         .then(response => {
    //             console.log(response)
    //             this.setState({data: response.data.data})
    //         })
    // }

    render() {
        const cellDataWithPrecisionIfPresent = row => ((row.value > 0) ? row.value.toPrecision(3) : <Label size='mini' color='teal'>N/A</Label>);

        const SliderFilter = ({ filter, onChange }) => (
            <Slider range defaultValue={[0, 1]} step={0.01} min={0} max={1} onAfterChange={value => onChange(value)} />
        )
        const sliderFilterMethodGenerator = (field) => ((filter, row) => {
            if (!filter.value) {
              return true;
            } else {
                const start = filter.value[0];
                const end = filter.value[1];
                return (start <= row[field]) && (row[field] <= end);
            }
        })
        const histogramBrushMethod = (filter, rows, col) => {
            if (!filter.value) {
                return rows;
            } else {
                // console.log(filter)
                const start = filter.value[0];
                const end = filter.value[1];
                //   return (start <= row[field]) && (row[field] <= end);
                const filtered = rows.filter(row => ((start <= row.gtex) && (row.gtex <= end)))

                return filtered
            }
        }
        const HistogramBrushFilter = ({ filter, onChange }) => {
            return <VictoryChart
                containerComponent={
                    <VictoryBrushContainer
                    brushDimension='x'
                    brushDomain={{x: [0, 1]}}
                    onBrushDomainChange={_.debounce((domain, props) => onChange(domain.x), 300)}
                    />
                }
                >
                <VictoryAxis
                    domain={[0, 1]}
                //   label={'2017'}
                //   tickValues={[1, 2, 3, 4]}
                //   tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                />
                <VictoryAxis
                  dependentAxis
                //   domain={[0, max()]}
                //   tickFormat={(x) => (`$${x}k`)}
                />
                <VictoryBar 
                    domainPadding={0}
                    data={[
                        {x: 0, y: 5},
                        {x: 0.1, y: 6},
                        {x: 0.3, y: 4.5},
                        {x: 0.6, y: 7},
                        {x: 0.9, y: 2},
                        {x: 1, y: 3},
                    ]}
                />
            </VictoryChart>
        }

        const columns = [
            {
                Header: 'Target',
                id: 'target',
                accessor: d => d.target.target_name
            },
            {
                Header: 'Disease',
                id: 'disease',
                accessor: d => d.disease.name,
            },
            {
                Header: 'Variant',
                id: 'variant',
                accessor: d => d.variant.id.split('/')[4],
            },
            {
                Header: 'Target to Variant',
                columns: [{
                    Header: 'Score',
                    id: 'score',
                    accessor: d => d.evidence.gene2variant.metadata.funcgen.ot_g2v_score,
                    Cell: cellDataWithPrecisionIfPresent,
                },
                {
                    Header: 'GTEx',
                    id: 'gtex',
                    accessor: d => d.evidence.gene2variant.metadata.funcgen.gtex_score,
                    Cell: cellDataWithPrecisionIfPresent,
                    Filter: HistogramBrushFilter,
                    // Filter: SliderFilter,
                    filterMethod: histogramBrushMethod,
                    filterAll: true,
                },
                {
                    Header: 'PCHiC',
                    id: 'pchic',
                    accessor: d => d.evidence.gene2variant.metadata.funcgen.pchic_score,
                    Cell: cellDataWithPrecisionIfPresent,
                    Filter: SliderFilter,
                    filterMethod: sliderFilterMethodGenerator('pchic'),
                },
                {
                    Header: 'DHS',
                    id: 'dhs',
                    accessor: d => d.evidence.gene2variant.metadata.funcgen.dhs_score,
                    Cell: cellDataWithPrecisionIfPresent,
                },
                {
                    Header: 'Fantom5',
                    id: 'fantom5',
                    accessor: d => d.evidence.gene2variant.metadata.funcgen.fantom5_score,
                    Cell: cellDataWithPrecisionIfPresent,
                },
                {
                    Header: 'Is nearest?',
                    id: 'nearest',
                    accessor: d => d.evidence.gene2variant.metadata.funcgen.is_nearest_gene,
                }]
            },
            {
                Header: 'Disease to Variant',
                columns: [
                    {
                        Header: 'GWAS Population Size',
                        id: 'gwasPopSize',
                        accessor: d => d.evidence.variant2disease.gwas_sample_size,
                    },
                    {
                        Header: 'GWAS Variant',
                        id: 'gwasVariant',
                        accessor: d => d.evidence.variant2disease.lead_snp_rsid,
                    },
                    {
                        Header: 'GWAS p-value',
                        id: 'gwasPValue',
                        accessor: d => d.evidence.variant2disease.resource_score.value,
                        Cell: cellDataWithPrecisionIfPresent,
                    }
                ]
            },
            {
                Header: 'r2',
                id: 'r2',
                accessor: d => parseFloat(d.unique_association_fields.r2),
                Cell: cellDataWithPrecisionIfPresent,
            },
        ]
    
      return (
        <ReactTable
            data={this.props.data}
            columns={columns}
            filterable
        />
      );
    }
  }
  
const PostgapTableRedux = connect(mapStateToProps)(PostgapTable);

export default PostgapTableRedux;
