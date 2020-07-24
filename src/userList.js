import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';

import UserDetails from './userDetails';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

// This function creates the user list
export default function UserList({ users }) {
    //using hooks the maintain the state in funtional component
    const [open, setOpen] = React.useState(false); 
    const classes = useStyles();
    let selectedUser = users[0];

    // calls the modal when the user name is clicked
    const handleClick = (e) => {
        selectedUser = [];
        //can be simplified if you get the list index
        users.forEach((user, index) => {
            if (user.real_name === e.target.innerText) {
                selectedUser.push(users[index]);
                return;
            }
        });
        setOpen(true);
    };

    return (
        <div>
            <div className={classes.root}>
                <List key='userList'>
                    {users.map((user) => (
                        <ListItem button onClick={event => handleClick(event)}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={user.real_name} />
                        </ListItem>
                    ))}
                </List>
            </div>
            <UserDetails
                functions={[open, setOpen]}
                selectedUsersActivity={selectedUser.activity_periods}
            />
        </div>
    )
}