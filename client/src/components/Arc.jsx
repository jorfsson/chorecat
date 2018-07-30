import React from 'react';
import * as d3 from 'd3';
import $ from 'jquery';

//This component shows what percentage of chores each user has completed.
//Charts component imports this Arc component in order to generate
//each slice of the pie chart.

class Arc extends React.Component {
  constructor (props) {
    super(props);
    this.arc = d3.arc()
    this.state = {
      isMouseInside: false,
      opacity: 0,
    }
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  mouseEnter() {
    this.setState({ isMouseInside: true, opacity: 1});
    this.arc.innerRadius(this.props.innerRadius * 1.2);
    this.arc.outerRadius(this.props.outerRadius * 1.2);
  }

  mouseLeave() {
    this.setState({ isMouseInside: false, opacity: 0});
    this.arc.innerRadius(this.props.innerRadius);
    this.arc.outerRadius(this.props.outerRadius);

  }

  render () {
    return (
    <path d={this.arc(this.props.data)}
      style={{fill: this.props.color}}
      onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
      ></path>
    )
  }
}

class LabeledArc extends Arc {
    constructor (props) {
      super(props);
      this.arc.innerRadius(this.props.innerRadius);
      this.arc.outerRadius(this.props.outerRadius);
      this.arc.cornerRadius(this.props.cornerRadius);
      this.days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        7: "Sunday"
      }
      console.log(this.props.typeText, 'hello')
      if (this.props.data.data.value > 1) {
        this.typeText = this.props.typeText + "s"
      } else {
        this.typeText = this.props.typeText
      }
      this.firstLine = () =>{
        if (this.props.type === "user"){
          return (<tspan x='0' dy='1em' y="-15">{this.props.data.data.label} completed</tspan>)
        } else if (this.props.type === "chore") {
          return (<tspan x='0' dy='1em' y="-15">{this.props.data.data.label} completed</tspan>)
        } else {
          return (<tspan x='0' dy='1em' y="-15">{this.days[this.props.data.data.label]}</tspan>)
        }
      }
      this.secondLine = () =>
       (<tspan x='0' dy='1em'>({this.props.data.data.value}) {this.typeText}</tspan>)
    }

    render() {
        return (
            <g id={this.props.data.data.label}>
                {super.render()}
                <text className="info" fontSize="1em"
                      textAnchor="middle" style={{
                        opacity: this.state.opacity,
                        fontStyle: "italic",
                        fontColor: this.props.color
                      }}>
                      {this.firstLine()}
                      {this.secondLine()}
                </text>
            </g>
        );
    }
}

export default LabeledArc;
