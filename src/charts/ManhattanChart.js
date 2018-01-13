import { scaleLinear } from 'd3-scale';
import Axis from '.utils/Axis';

class ManhattanPlot extends Component {
    constructor(props){
         super(props)
         this.state = {
             yScale: scaleLinear()
                 .domain(extent(this.props.data, this.props.logpAccessor))
                 .range([
                    this.props.margin.bottom,
                    this.props.size[1] - this.props.margin.bottom - this.props.margin.top
                 ]),
             xScale: scaleLinear()
                 .domain(extent(this.props.data, this.props.positionAccessor))
                 .range([
                     this.props.margin.left,
                     this.props.size[0] - this.props.margin.left - this.props.margin.right
                  ])
         }
     }
 
     render() {
       return <svg ref={node => this.node = node}
       width={500} height={500}>
         <Layer translation={[20, 20]}>
         <Points data={this.props.data.map(d => ({
                 id: this.props.snpIdAccessor(d),
                 x: this.props.positionAccessor(d),
                 y: this.props.logpAccessor(d)
             }))}
             xscale={this.state.xscale}
             yscale={this.state.yscale}
         />
         <AxisBottom
             scale={this.state.xscale}
             translate={[
                 0,
                 this.props.size[1] - this.props.margin.bottom - this.props.margin.top
             ]}
          />
          <AxisLeft
             scale={this.state.yscale}
             translate={[
                 0,
                 0
             ]}
          />
          </Layer>
       </svg>
    }
 }
 ManhattanPlot.defaultProps = {
     margin: {top: 20, right: 20, bottom: 20, left: 20}
 }

 export default ManhattanPlot