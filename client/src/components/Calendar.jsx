import React from 'react';
import ChoreRow from './ChoreRow.jsx';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

//The Calendar component is a table where the first row is the table headers.
//The body of the table consists of ChoreRow components which are mapped from
//the chores array. Items are added to the chores array by way of a POST request
//from the ChoreInput component and the chores array is populated by a GET request
//to the chores table in the database. Many props are passed down into ChoreRow
//so that they can be used in ChoreCell.
//As each chore is being mapped to a ChoreRow, it also loops through the array of
//completedChores. If the completedChores array contains a chore that matches the
//chore associated with the ChoreRow, it will pass down an array of triples which
//contains the name of the user who completed the chore, the dayId (a number), and.
//completedChoreId. These tuples will be used in the ChoreRow component and passed down  
//to the ChoreCell component in order to render the names of users who completed that
//chore on the specified day. Basically, we are rendering the database on the client.

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Chore</TableCell>
              <TableCell>Sunday</TableCell>
              <TableCell>Monday</TableCell>
              <TableCell>Tuesday</TableCell>
              <TableCell>Wednesday</TableCell>
              <TableCell>Thursday</TableCell>
              <TableCell>Friday</TableCell>
              <TableCell>Saturday</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.chores.map(chore => {
              let completedBy = [];
              this.props.completedChores.forEach(completed => {
                if (completed["chore_name"] === chore["chore_name"]) {
                  completedBy.push([completed["user_name"], completed.day, completed.id]);
                }
              });
              return <ChoreRow 
                key={chore.id} 
                chore={chore} 
                users={this.props.users} 
                completedBy={completedBy} 
                fetchAllChores={this.props.fetchAllChores} 
                fetchAllComplete={this.props.fetchAllCompletedChores}/>
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default Calendar;
