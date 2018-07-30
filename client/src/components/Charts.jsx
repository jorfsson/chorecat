import React from 'react';
import LabeledArc from './Arc.jsx';
import * as d3 from 'd3';

//The PieChart component renders a pie chart which shows the percentage
//of chores each user has completed. Ideally, these user-facing analytics
//would live on their own dashboard component or page and not on the App.

class PieChart extends React.Component {
  constructor () {
    super();
    /* D3 renders pie here in the PieChart constructor
       'd' is an inherent property within d3 and refers
       to the passed in data object. Current data object
       is set with value/label keys. Value determines the
       construction of the pie, while sort relies on label
    */
    this.pie = d3.pie()
      .value((d)=>d.value)
      .sort(function(a, b) {
		return a.label.localeCompare(b.label);
	});
    /* Refer to d3 scaleOrdinal specifications for color schema to be used */
    this.colors = d3.scaleOrdinal( d3.schemeBuPu[1, 5]);
  }

  /* arcGenerator constructs each individual slice of the pie
     Data is passed down through here
  */
  arcGenerator(d, i) {
    return (
        <LabeledArc key={`arc-${i}`}
          data={d}
          innerRadius={this.props.innerRadius}
          outerRadius={this.props.outerRadius}
          cornerRadius={this.props.cornerRadius}
          typeText={this.props.typeText}
          type={this.props.type}
          color={this.colors(i)} />
    )
  }

  render () {
    /* Where pie is actually rendered */
    let pie = this.pie(this.props.data),
      translate = `translate(${this.props.x}, ${this.props.y})`;

      return (
        /* SVG is canvas is created here for entire chartData
           arcGenerator is called on each passed in specific data Object
        */
        <svg width="450" height="450">
          <g transform={translate} style={{margin: "auto"}}>
            {pie.map((d, i)=> {return this.arcGenerator(d, i)})}
          </g>
        </svg>
      )
  }
}

export default PieChart
