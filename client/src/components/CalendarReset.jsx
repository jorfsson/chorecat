import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

//This component is a button which opens a dialog box that asks the user
//if they are sure they want to reset the calendar. Resetting the calendar
//removes all records from the completedChores table in the database.
//Future functionality should keep a history of completed chores from previous weeks,
//while changing the Calendar component to be a new week with no completed chores. 
//The Calendar component would ideally be a paginated table.

class CalendarReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.resetCalendar = this.resetCalendar.bind(this);
  }

  handleClickOpen() {
    this.setState({ 
      open: true
    });
  };

  handleClose() {
    this.props.fetchAllCompletedChores();
    this.setState({ open: false });
  };

  resetCalendar() {
    axios.delete('/api/calendar')
    .then(this.handleClose());
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Reset Week</Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Are you sure you want to reset the calendar?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.resetCalendar} color="primary">
              Reset Calendar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default CalendarReset;