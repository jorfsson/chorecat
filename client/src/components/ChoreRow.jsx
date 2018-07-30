import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import ChoreCell from './ChoreCell.jsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

//The ChoreRow component populates ChoreCell components.
//The first cell in the ChoreRow is the name of the chore. Upon mouseenter,
//you can click the X icon to open a dialog box which asks if you are sure
//that you want to delete that chore (and therefore, the row).
//The rest of the cells are related to the days of the week, which is why we
//map through the array [0, 1, 2, 3, 4, 5, 6] which are the dayIds associated
//with each day of the week. As we map through that array, we look at the
//completedBy array which contains tuples of the user who completed the
//chore associated with the current ChoreRow as well as the day the chore
//was completed. We do this so that we can pass down the username down to the
//ChoreCell so that it can be rendered there.
//Future functionality is to edit the chore name for the ChoreRow.

class ChoreRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      chore: ''
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.deleteChore = this.deleteChore.bind(this);
  }

  mouseEnter() {
    this.setState({ isMouseInside: true });
  }

  mouseLeave() {
    this.setState({ isMouseInside: false });
  }

  handleClickOpen(chore) {
    this.setState({
      open: true,
      dialogChore: chore
    });
  };

  handleClose() {
    this.setState({ open: false });
    this.props.fetchAllChores();
    this.props.fetchAllComplete();
  };

  deleteChore(id) {
    console.log(`chore id is: ${id}`);
    axios.delete(`/api/chores/${id}`, {
      params: {
        choreId: `${id}`
      }
    })
      .then(this.handleClose());
  }

  render() {
    return (
      <TableRow>
        <TableCell onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
          {this.props.chore["chore_name"]}
          {this.state.isMouseInside ? <Icon onClick={() => this.handleClickOpen(this.props.chore.id)}>clear</Icon>: null}
          <div>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.open}
              onClose={this.handleClose}
            >
              <DialogTitle>Are you sure you want to delete this chore?</DialogTitle>
              <DialogActions choreid={this.props.choreid}>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                  </Button>
                <Button onClick={() => this.deleteChore(this.state.dialogChore)} color="primary">
                  Delete Chore
                  </Button>
              </DialogActions>
            </Dialog>
          </div>
        </TableCell>
        {[0, 1, 2, 3, 4, 5, 6].map(dayId => {
          let completedBy = '';
          this.props.completedBy.forEach(tuple => {
            if (Number(tuple[1]) === dayId) {
              completedBy = tuple[0];
            }
          });
          return <ChoreCell key={dayId} day={dayId} chore={this.props.chore} users={this.props.users} completedBy={completedBy} fetchComplete={this.props.fetchAllComplete} />
        }
        )}
      </TableRow>
    )
  }
}

export default ChoreRow;
