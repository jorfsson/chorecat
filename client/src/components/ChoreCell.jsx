import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';

//The ChoreCell component allows you to mark a chore as complete.
//Future functionality should be to edit who completed the chore,
//to undo chore completion. Design-wise, the name would utilize the
//Material UI chip component and upon mouseenter, you would see 
//buttons to edit and undo.

// const styles = theme => ({
//   root: {
//     display: 'flex',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//   },
//   chip: {
//     margin: theme.spacing.unit,
//   },
// });

class ChoreCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isMouseInside: false,
      selectedRoomie: this.props.completedBy || '',
      day: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.markAsComplete = this.markAsComplete.bind(this);
  }

  mouseEnter() {
    this.setState({ isMouseInside: true });
  }

  mouseLeave() {
    this.setState({ isMouseInside: false });
  }

  handleChange(event) {
    this.setState({ selectedRoomie: event.target.value });
  };

  handleClickOpen(day) {
    this.setState({ 
      open: true,
      dialogDay: day  
    });
  };

  handleClose() {
    this.props.fetchComplete();
    this.setState({ open: false });
  };

  markAsComplete() {
    axios.post('/api/calendar', {
      choreId: this.props.chore.id,
      userId: this.state.selectedRoomie,
      day: this.state.dialogDay 
    })
      .then(this.handleClose());
  }

  render() {
    //const { classes } = this.props;
    let chip;
    if (this.props.completedBy !== '') {
      chip = <Chip label={this.props.completedBy} />;
    } else {
      chip = null;
    }

    return (
      <TableCell onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        {this.state.isMouseInside ? <Icon onClick={() => this.handleClickOpen(this.props.day)}>add_circle</Icon> : null}
        {chip}
        <div>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogTitle>Who completed this chore?</DialogTitle>
            <DialogContent>
              <form>
                <FormControl>
                  <InputLabel>Roomie</InputLabel>
                  <Select
                    value={this.state.selectedRoomie}
                    onChange={this.handleChange}
                    input={<Input id="user" />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {this.props.users.map(user => <MenuItem key={user.id} value={user.id}>{user["user_name"]}</MenuItem>)}
                  </Select>
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.markAsComplete} color="primary">
                YAS I DID IT
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </TableCell>
    )
  }
}

export default ChoreCell;