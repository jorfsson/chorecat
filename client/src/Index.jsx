import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import App from './components/App.jsx';
import ButtonAppBar from './components/ButtonAppBar.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import axios from 'axios';

//Index component contains routes
class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
    this.toggleLoginState = this.toggleLoginState.bind(this);
    this.toggleLogoutState = this.toggleLogoutState.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
  }

  componentDidMount() {
    this.checkLoginState();
  }

  checkLoginState() {
    axios.get('/api/verify')
      .then((res) => {
        if (res.status === 200) {
          this.setState({isLoggedIn: true})
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  toggleLoginState(e) {
    this.setState({isLoggedIn: true}, () => {
      return (
        <Redirect to="/app" />
      )});
  }

  toggleLogoutState(e) {
    this.setState({isLoggedIn: false});
  }

  render() {
    return (
      <Router>
        <div>
          <ButtonAppBar isLoggedIn={this.state.isLoggedIn} onLogoutClick={this.toggleLogoutState}/>
          <Switch>
            <Route path="/login" render={props => (
              <SignIn router={props} isLoggedIn={this.state.isLoggedIn} onSignInSubmit={this.toggleLoginState}/>
            )} />
            <Route path="/register" render={props => (
              <SignUp router={props} isLoggedIn={this.state.isLoggedIn} onSignUpSubmit={this.toggleLoginState}/>
            )} />
            <Route path="/logout" render={props => (
              <Redirect to="/login" />
            )} />
            <Route path="/app" render={props => (
              <div>
                {this.state.isLoggedIn ? <App /> : <SignIn router={props} isLoggedIn={this.state.isLoggedIn} onSignInSubmit={this.toggleLoginState} /> }
              </div>
            )} />
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'));