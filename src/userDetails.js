import React from 'react'

import Paper from "@material-ui/core/Paper";
import Modal from '@material-ui/core/Modal';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
// funtion responsible to open the modal with the content
export default function UserDetails(props) {
    const { selectedUsersActivity } = props;
    const [open, setOpen] = props.functions;
    const currentDate = moment().format('YYYY-MM-DD 00:00:00');
    const classes = useStyles();
    const [filteredActivityData, setfilteredData] = React.useState(selectedUsersActivity);

    // Filters the data based on selected date
    const handleDateChange = (event) => {
        // if date is selected then compare dates and filter the data, Else show all data 
        if (event.currentTarget.value) {
            const selectedDate = new Date(`${event.currentTarget.value} 00:00:00`);
            let fileredData = []
            // need to tackle the situation where session starts today and end tomorrow in future
            selectedUsersActivity.forEach((session) => {
                const startDate = new Date(session.start_time.slice(0, 11));
                if (selectedDate.valueOf() === startDate.valueOf()) {
                    fileredData.push(session);
                }
            });
            setfilteredData(fileredData);
        } else {
            setfilteredData(selectedUsersActivity);
        }
    }

    // Creates the Timeline UI 
    const getSessions = () => {
        if (filteredActivityData) {
            const session = filteredActivityData.map((session, index) => {
                return (
                    < TimelineItem key={index} >
                        <TimelineSeparator>
                            <TimelineDot color="primary" variant="outlined">
                                <AccessTimeIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={6} >
                                <Typography variant="h6" component="h1">
                                    {session.start_time}
                                </Typography>
                                <Typography variant="h6" component="h1" align='center'>
                                    |
                            </Typography>
                                <Typography variant="h6" component="h1">
                                    {session.end_time}
                                </Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem >
                );
            });
            return session;
        }
        return ''
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(!open)}
            >
                <div style={{
                    top: '20%',
                    left: '40%',
                    right: '20%',
                    bottom: '15%',
                    overflow: "scroll"
                }}
                    className={classes.paper} >
                    <h2 id="simple-modal-title" align='center'>User Activity Details: </h2>
                    <TextField
                        id="date"
                        label="Select a date to filer"
                        type="date"
                        onChange={handleDateChange}
                        InputProps={{ inputProps: { max: currentDate } }} // since the session wont be in a future date.
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Timeline align="alternate">
                        {getSessions()}
                    </Timeline>
                    <div
                        style={{
                            display: !filteredActivityData ? 'flex' : 'none',
                        }}
                    >
                        <h2 id="simple-modal-title" align='center'>No Activity on the selected Date: </h2>
                    </div>

                </div >
            </Modal>
        </div>
    );
}
