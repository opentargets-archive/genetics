import PropTypes from "prop-types";
import React from "react";
import { partialRight } from "lodash";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryLabel, addEvents,
  VictoryContainer, VictoryTheme, DefaultTransitions, Candle
} from "victory-core";
import GeneHelpers from "./helper-methods";
// import { BaseProps, DataProps } from "../../helpers/common-props";
import { BaseProps, DataProps } from "../victory/common-props";

import Gene from './Gene';


/*eslint-disable no-magic-numbers */
const fallbackProps = {
//   width: 450,
//   height: 300,
//   padding: 50,
//   geneColors: {
//     spit: "#ffffff",
//     exon: "#252525"
//   }
};

const defaultData = [
  { x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0 },
  { x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5 },
  { x: new Date(2016, 6, 3), open: 15, close: 20, high: 25, low: 10 },
  { x: new Date(2016, 6, 4), open: 20, close: 25, high: 30, low: 15 },
  { x: new Date(2016, 6, 5), open: 25, close: 30, high: 35, low: 20 },
  { x: new Date(2016, 6, 6), open: 30, close: 35, high: 40, low: 25 },
  { x: new Date(2016, 6, 7), open: 35, close: 40, high: 45, low: 30 },
  { x: new Date(2016, 6, 8), open: 40, close: 45, high: 50, low: 35 }
];
/*eslint-enable no-magic-numbers */

const animationWhitelist = [
  "data", "domain", "height", "padding", "samples", "size", "style", "width"
];

class VictoryGene extends React.Component {
  static displayName = "VictoryGene";
  static role = "gene";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static propTypes = {
    ...BaseProps,
    ...DataProps,
    // candleColors: PropTypes.shape({ positive: PropTypes.string, negative: PropTypes.string }),
    // end: PropTypes.oneOfType([
    //   PropTypes.func,
    //   CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
    //   PropTypes.string,
    //   PropTypes.arrayOf(PropTypes.string)
    // ]),
    // start: PropTypes.oneOfType([
    //   PropTypes.func,
    //   CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
    //   PropTypes.string,
    //   PropTypes.arrayOf(PropTypes.string)
    // ]),
    // exon: PropTypes.oneOfType([
    //   PropTypes.func,
    //   CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
    //   PropTypes.string,
    //   PropTypes.arrayOf(PropTypes.string)
    // ]),
    // exonEnd: PropTypes.oneOfType([
    //     PropTypes.func,
    //     CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
    //     PropTypes.string,
    //     PropTypes.arrayOf(PropTypes.string)
    // ]),
  };

  static defaultProps = {
    containerComponent: <VictoryContainer/>,
    data: defaultData,
    dataComponent: <Gene/>,
    groupComponent: <g role="presentation"/>,
    labelComponent: <VictoryLabel/>,
    samples: 50,
    scale: "linear",
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale
  };

  static getDomain = GeneHelpers.getDomain.bind(GeneHelpers);
  static getData = GeneHelpers.getData.bind(GeneHelpers);
  static getBaseProps = partialRight(
    GeneHelpers.getBaseProps.bind(GeneHelpers), fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const { role } = this.constructor;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);
    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }
    const children = this.renderData(props);
    return props.standalone ? this.renderContainer(props.containerComponent, children) : children;
  }
}

export default addEvents(VictoryGene);
