import React from 'react';
import LabeledArc from './Arc.jsx';
import * as d3 from 'd3';

//The PieChart component renders a pie chart which shows the percentage
//of chores each user has completed. Ideally, these user-facing analytics
//would live on their own dashboard component or page and not on the App.

class PieChart extends React.Component {
  constructor () {
    super();
    this.pie = d3.pie()
      .value((d)=>d.value);
    this.colors = d3.scaleOrdinal( d3.schemeBuPu[1, 5]);
  }

  arcGenerator(d, i) {
    return (
        <LabeledArc key={`arc-${i}`}
          data={d}
          innerRadius={this.props.innerRadius}
          outerRadius={this.props.outerRadius}
          cornerRadius={this.props.cornerRadius}
          type={this.props.typeText}
          color={this.colors(i)} />
    )
  }

  render () {
    let pie = this.pie(this.props.data),
      translate = `translate(${this.props.x}, ${this.props.y})`;

      return (
        <svg width="450" height="450">
        <g transform={translate}>
          {pie.map((d, i)=> {return this.arcGenerator(d, i)})}
        </g>
        </svg>
      )
  }

}

export default PieChart
