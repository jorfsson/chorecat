import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './components/App.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

class Index extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/app">App</Link></li>
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
          </ul>

          <hr />

          <Route exact path="/app" render={props => (
            <App />
          )} />
          <Route path="/login" render={() => (
            <SignIn />
          )} />
          <Route path="/register" render={() => (
            <SignUp />
          )} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'));