import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import axios from 'axios';

//The ButtonAppBar component contains navigation functionality, but still needs
//to be fully built out. It is missing the Material UI Drawer component which should
//contains links to navigate through the app as well as sign in/up/out. 
//It currently shows Sign In/Up if user is not logged in. It will show Sign Out if
//user is logged in.

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleSignOut(e) {
    axios.get('/api/logout')
      .then((res) => {
        this.props.onLogoutClick(e);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { classes } = this.props;
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link to="/app">
                Chore Cat
            </Link>
            </Typography>
            {this.props.isLoggedIn ? (
              <Link to="/logout">
                <Button color="inherit" onClick={(e) => {this.handleSignOut(e)}}>Sign Out</Button>
              </Link>
            ) : (
              <div>
                <Link to="/login">
                  <Button color="inherit">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button color="inherit">Sign Up</Button>
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(ButtonAppBar);