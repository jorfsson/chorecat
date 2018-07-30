import React from 'react';
import Calendar from './Calendar.jsx';
import ChoreInput from './ChoreInput.jsx';
import UserInput from './UserInput.jsx';
import axios from 'axios';
import PieChart from './Charts.jsx';
import Button from '@material-ui/core/Button';
import * as d3 from 'd3';
import CalendarReset from './CalendarReset.jsx';

//This component should only be accessed by users who are signed in.
//Currently, if the user is not signed in and attempts to access /app,
//the user will see errors in the console and a blank page.
//Authenticated route needs to be built in order to direct users to
//login page if not signed in.

const titles = {
  display: 'flex',
  justifyContent: 'space-around',
  fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
}

const pies = {
  display: 'flex',
  justifyContent: 'space-around'
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chores: [],
      users: [],
      completedChores: [],
      choresPerUser: [],
      ChoresByQuantity: [],
      daysQuantity: []
    }
    this.fetchAllChores = this.fetchAllChores.bind(this);
    this.fetchAllUsers = this.fetchAllUsers.bind(this);
    this.fetchAllCompletedChores = this.fetchAllCompletedChores.bind(this);
    this.formatChoresPerUser = this.formatChoresPerUser.bind(this);
    this.formatChoresByQuantity = this.formatChoresByQuantity.bind(this);
  }

  componentDidMount() {
    this.fetchAllChores();
    this.fetchAllUsers();
    this.fetchAllCompletedChores();
    this.formatChoresPerUser();
  }

  fetchAllUsers() {
    axios.get('/api/users')
      .then((res) => {
        this.setState({
          users: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      })
  }

  fetchAllChores() {
    axios.get('/api/chores')
      .then((res) => {
        this.setState({
          chores: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  fetchAllCompletedChores() {
    axios.get('/api/calendar')
      .then((res) => {
        this.setState({
          completedChores: res.data
        });
          this.formatChoresPerUser();
          this.formatChoresByQuantity();
          this.formatDaysQuantity();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  formatChoresPerUser() {
    let chartData = {};
    let choresPerUser = [];
    this.state.completedChores.forEach((chore)=>{
      let user = chore.user_name
      if(chartData[user]) {
        chartData[user]++
      } else {
        chartData[user] = 1
      }
    });
    for (var i in chartData){
      choresPerUser.push({value: chartData[i], label: i})
    }
    this.setState({
      choresPerUser: choresPerUser
    })
  }

  formatChoresByQuantity() {
    let chartData = {};
    let ChoresByQuantity = [];
    this.state.completedChores.forEach((chore)=>{
      let choreName = chore.chore_name
      if(chartData[choreName]) {
        chartData[choreName]++
      } else {
        chartData[choreName] = 1
      }
    });
    for (var i in chartData){
      ChoresByQuantity.push({value: chartData[i], label: i})
    }
    this.setState({
      ChoresByQuantity: ChoresByQuantity
    })
  }

  formatDaysQuantity() {
    let chartData = {};
    let daysQuantity = [];
    this.state.completedChores.forEach((chore)=>{
      let day = chore.day
      if(chartData[day]) {
        chartData[day]++
      } else {
        chartData[day] = 1
      }
    });
    for (var i in chartData){
      daysQuantity.push({value: chartData[i], label: i})
    }
    this.setState({
      daysQuantity: daysQuantity
    })
  }

  render() {
    return (
      <div>
        {/* UserInput is commented out because sending invite links only
        makes sense if you have an actual link that isn't localhost */}
        {/* <UserInput fetchAllUsers={this.fetchAllUsers}/> */}
        <ChoreInput fetchAllChores={this.fetchAllChores}/>
        <CalendarReset fetchAllCompletedChores={this.fetchAllCompletedChores}/>
        <Calendar
          chores={this.state.chores}
          users={this.state.users}
          completedChores={this.state.completedChores}
          fetchAllCompletedChores={this.fetchAllCompletedChores}
          fetchAllChores={this.fetchAllChores}/>
        <div style={titles}>
          <h4>Chores per user</h4>
          <h4>Chores by completed quantity</h4>
          <h4>Days with most chores</h4>
        </div>
        <div style={pies}>
          <PieChart x={220} y={220} outerRadius={175} innerRadius={75} cornerRadius={5}
            data={this.state.choresPerUser} typeText={"chore"} type={"user"} />
          <PieChart x={220} y={220} outerRadius={175} innerRadius={75} cornerRadius={5}
            data={this.state.ChoresByQuantity} typeText={"time"} type={"chore"} />
          <PieChart x={220} y={220} outerRadius={175} innerRadius={75} cornerRadius={5}
            data={this.state.daysQuantity} typeText={"chore"} type={"day"} />
        </div>
      </div>
    )
  }
}

export default App;
