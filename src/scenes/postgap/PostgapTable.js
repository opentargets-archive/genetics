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


// get data with POST request to...
// https://master-dot-open-targets-eu-dev.appspot.com/v3/platform/public/evidence/filter?
// with payload...
// {"target":["ENSG00000172057"],"size":1000,"datasource":["gwas_catalog","phewas_catalog"],"fields":["target.gene_info","disease.efo_info","variant","evidence","type"]}
// or GET request to...
// https://master-dot-open-targets-eu-dev.appspot.com/v3/platform/public/evidence/filter?size=1000&datasource=gwas_catalog&datasource=phewas_catalog&fields=unique_association_fields&fields=disease&fields=evidence&fields=variant&fields=target&fields=sourceID&fields=access_level&target=ENSG00000172057&disease=EFO_0000270&expandefo=true


class PostgapTable extends Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     data: [],
    //     //     gtexBins: [],
    //     // }
    // }

    // componentDidMount() {
    //     axios.get('https://master-dot-open-targets-eu-dev.appspot.com/v3/platform/public/evidence/filter?size=1000&datasource=gwas_catalog&datasource=phewas_catalog&fields=unique_association_fields&fields=disease&fields=evidence&fields=variant&fields=target&fields=sourceID&fields=access_level&target=ENSG00000172057&disease=EFO_0000270&expandefo=true')
    //         .then(response => {
    //             // console.log(response)
    //             this.setState({data: response.data.data})
    //         })
    // }

    render() {
        // const data = [{
        //     name: 'Tanner Linsley',
        //     age: 26,
        //     friend: {
        //       name: 'Jason Maurer',
        //       age: 23,
        //     }
        //   },
        //   {
        //     name: 'Janner Linsley',
        //     age: 27,
        //     friend: {
        //       name: 'Dason Maurer',
        //       age: 21,
        //     }
        //   },
        //   {
        //     name: 'C',
        //     age: 27,
        //     friend: {
        //       name: 'Dason Maurer',
        //       age: 21,
        //     }
        //   }
        // ]

        // const columns = [{
        //     Header: 'Name',
        //     accessor: 'name' // String-based value accessors!
        //   }, {
        //     Header: 'Age',
        //     accessor: 'age',
        //     Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        //   }, {
        //     id: 'friendName', // Required because our accessor is not a string
        //     Header: 'Friend Name',
        //     accessor: d => d.friend.name // Custom value accessors!
        //   }, {
        //     Header: props => <span>Friend Age</span>, // Custom header components!
        //     accessor: 'friend.age'
        //   }]
        const cellDataWithPrecisionIfPresent = row => ((row.value > 0) ? row.value.toPrecision(3) : <Label size='mini' color='teal'>N/A</Label>);

        // const SliderFilter = ({ filter, onChange }) => (
        //     <Slider range defaultValue={[0, 1]} step={0.01} min={0} max={1} onAfterChange={value => onChange(value)} />
        // )
        // const sliderFilterMethodGenerator = (field) => ((filter, row) => {
        //     if (!filter.value) {
        //       return true;
        //     } else {
        //         const start = filter.value[0];
        //         const end = filter.value[1];
        //         return (start <= row[field]) && (row[field] <= end);
        //     }
        // })
        // const histogramBrushMethod = (filter, rows, col) => {
        //     if (!filter.value) {
        //         return rows;
        //     } else {
        //         // console.log(filter)
        //         const start = filter.value[0];
        //         const end = filter.value[1];
        //         //   return (start <= row[field]) && (row[field] <= end);
        //         const filtered = rows.filter(row => ((start <= row.gtex) && (row.gtex <= end)))

        //         return filtered
        //     }
        // }
        // const HistogramBrushFilter = ({ filter, onChange }) => {
        //     return <VictoryChart
        //         containerComponent={
        //             <VictoryBrushContainer
        //             brushDimension='x'
        //             brushDomain={{x: [0, 1]}}
        //             onBrushDomainChange={_.debounce((domain, props) => onChange(domain.x), 300)}
        //             />
        //         }
        //         >
        //         <VictoryAxis
        //             domain={[0, 1]}
        //         //   label={'2017'}
        //         //   tickValues={[1, 2, 3, 4]}
        //         //   tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        //         />
        //         <VictoryAxis
        //           dependentAxis
        //         //   domain={[0, max()]}
        //         //   tickFormat={(x) => (`$${x}k`)}
        //         />
        //         <VictoryBar 
        //             domainPadding={0}
        //             data={[
        //                 {x: 0, y: 5},
        //                 {x: 0.1, y: 6},
        //                 {x: 0.3, y: 4.5},
        //                 {x: 0.6, y: 7},
        //                 {x: 0.9, y: 2},
        //                 {x: 1, y: 3},
        //             ]}
        //         />
        //     </VictoryChart>
        // }

        const columns = [
            {
                Header: 'Target',
                id: 'target',
                accessor: d => d.geneName
            },
            {
                Header: 'Disease',
                id: 'disease',
                accessor: d => d.efoName,
            },
            {
                Header: 'Variant',
                id: 'variant',
                accessor: d => d.ldSnpId,
            },
            {
                Header: 'Target to Variant',
                columns: [{
                    // Header: props => {
                    //     console.log(props);
                    //     // var x = scaleLinear()
                    //     //     .range([0, width]);
                    //     const h = histogram().thresholds(20).domain([0, 1]); //.thresholds(_.range(0, 1, 0.1));
                    //     console.log(h)
                    //     const raw = props.data.map(d => d.score)
                    //     console.log(raw)
                    //     const bins = h(raw)
                    //     console.log(bins)
                    //     // return 'Score';
                    //     return <Sparklines data={bins.map(d => d.length)}>
                    //         <SparklinesBars />
                    //     </Sparklines>
                    // },
                    Header: 'Score',
                    id: 'score',
                    accessor: d => d.otScore,
                    Cell: cellDataWithPrecisionIfPresent,
                    // aggregate: vals => {
                    //     console.log(vals);
                    //     return _.round(_.mean(vals));
                    // }
                },
                {
                    Header: 'GTEx',
                    id: 'gtex',
                    accessor: d => d.gtex,
                    Cell: cellDataWithPrecisionIfPresent,
                    // Filter: HistogramBrushFilter,
                    // // Filter: SliderFilter,
                    // filterMethod: histogramBrushMethod,
                    // filterAll: true,
                },
                {
                    Header: 'PCHiC',
                    id: 'pchic',
                    accessor: d => d.pchic,
                    Cell: cellDataWithPrecisionIfPresent,
                    // Filter: SliderFilter,
                    // filterMethod: sliderFilterMethodGenerator('pchic'),
                },
                {
                    Header: 'DHS',
                    id: 'dhs',
                    accessor: d => d.dhs,
                    Cell: cellDataWithPrecisionIfPresent,
                },
                {
                    Header: 'Fantom5',
                    id: 'fantom5',
                    accessor: d => d.fantom5,
                    Cell: cellDataWithPrecisionIfPresent,
                },
                // {
                //     Header: 'Is nearest?',
                //     id: 'nearest',
                //     accessor: d => d.evidence.gene2variant.metadata.funcgen.is_nearest_gene,
                // }
                ]
            },
            {
                Header: 'Disease to Variant',
                columns: [
                    {
                        Header: 'Sample Size',
                        id: 'gwasPopSize',
                        accessor: d => d.gwasSampleSize,
                    },
                    {
                        Header: 'Lead Variant',
                        id: 'gwasVariant',
                        accessor: d => d.gwasSnpId,
                    },
                    {
                        Header: 'p-value',
                        id: 'gwasPValue',
                        accessor: d => d.gwasPValue,
                        Cell: cellDataWithPrecisionIfPresent,
                    }
                ]
            },
            {
                Header: 'r2',
                id: 'r2',
                accessor: d => d.r2,
                Cell: cellDataWithPrecisionIfPresent,
            },
            // {
            //     Header: props => {
            //         console.log(props);
            //         // var x = scaleLinear()
            //         //     .range([0, width]);
            //         const h = histogram().thresholds(20).domain([0, 1]); //.thresholds(_.range(0, 1, 0.1));
            //         console.log(h)
            //         const raw = props.data.map(d => d.score)
            //         console.log(raw)
            //         const bins = h(raw)
            //         console.log(bins)
            //         // return 'Score';
            //     },
            //     id: 'score',
            //     accessor: d => d.evidence.gene2variant.metadata.funcgen.ot_g2v_score,
            //     // aggregate: vals => {
            //     //     console.log(vals);
            //     //     return _.round(_.mean(vals));
            //     // }
            // },
            // {
            //     Header: 'Variant location',
            //     id: 'variant',
            //     accessor: d => d.variant.id,
            // },
            // {
            //     id: 'friendName', // Required because our accessor is not a string
            //     Header: 'Friend Name',
            //     accessor: d => d.friend.name // Custom value accessors!
            // }, {
            //     Header: props => <span>Friend Age</span>, // Custom header components!
            //     accessor: 'friend.age'
            
            // }
        ]
    
      return (
        <ReactTable
            data={this.props.data}
            columns={columns}
            // filterable
        />
      );
    }
  }
  
  export default PostgapTable;
