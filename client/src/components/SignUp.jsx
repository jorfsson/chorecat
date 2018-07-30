import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import axios from 'axios';

//The SignUp component is the signup form aka for creating a new account.
//It will redirect users to the app because signups result in sign-ins
//thanks to the server. Successful sign-up will toggle isLoggedIn to true from the Index component and this
//is passed down to the ButtonAppBar component so that SignUp only shows if the user
//is not signed in.

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  
  handleSignUp(e) {
    const userObj = {
      name: this.username.value,
      pw: this.password.value
    }
    axios.post('api/users', userObj)
      .then( res => {
        //redirects user to app
        this.props.router.history.push("/app");
        this.props.onSignUpSubmit(e);
      })
      .catch( err => {
        console.error(err);
      })
  }

  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  render() {
    return (
        <Card>
          <CardContent>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Enter username:"
              type="text"
              fullWidth
              inputRef={(elm) => {
                this.username = elm;
              }}
            />
            <TextField
              margin="dense"
              id="password"
              label="Enter password:"
              type="password"
              fullWidth
              inputRef={(elm) => {
                this.password = elm;
              }}
            />
          </CardContent>
          <CardActions>
          <Button onClick={(e) => { this.handleSignUp(e) }} color="primary">
              Sign Up
            </Button>
          </CardActions>
        </Card>
    );
  }
}

export default SignUp;
