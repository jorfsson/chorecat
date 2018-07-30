import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

//The UserInput component was originally for adding new users, but this functionality
//no longer worked once we added user authentication. The goal for this component instead
//is to invite new users by sending either a text via Twilio or an email via Mailchimp (or
//another emailing tool).

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitNewUser = this.submitNewUser.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  };
  
  handleClose() {
    this.setState({ open: false });
  };

  submitNewUser() {
    axios.post('/api/users', {
      name: this.userInput.value
    })
    .then((res) => {
      //get user id back
      this.props.fetchAllUsers();
      this.handleClose();
    })
    .catch((err) => {
      console.error(err);
    });

  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Invite new roomie</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add user</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a new user:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="chore"
              label="New User"
              type="text"
              fullWidth
              inputRef={(elm) => {
                this.userInput = elm;
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submitNewUser} color="primary">
              Add user
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default UserInput;