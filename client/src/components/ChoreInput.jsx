import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

//The ChoreInput component allows you to add new chores to your Calendar.
//This will populate a new ChoreRow on the Calendar.

class ChoreInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitNewChore = this.submitNewChore.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  };
  
  handleClose() {
    this.setState({ open: false });
  };

  submitNewChore() {
    axios.post('/api/chores', {
      name: this.choreInput.value
    })
    .then((res) => {
      //get chore id back
      this.props.fetchAllChores();
      this.handleClose();
    })
    .catch((err) => {
      console.error(err);
    });

  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Add chore</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add chore</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a new chore:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="chore"
              label="New Chore"
              type="text"
              fullWidth
              inputRef={(elm) => {
                this.choreInput = elm;
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submitNewChore} color="primary">
              Add chore
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default ChoreInput;