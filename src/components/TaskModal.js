import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { addUserTask } from '../dynamodbClient';

function TaskModal(props) {
    const [isOpen, setIsOpen] = useState(props.open || false);
    const [username, setUsername] = useState(localStorage.getItem("user") || "");
    const [title, setTitle] = useState(props.title || "");
    const [description, setDescription] = useState(props.description || "");
    // default to be today
    const [dueDate, setDueDate] = useState(dayjs());
    const [status, setStatus] = useState(props.status || "");

    const handleSubmit = (e) => {
        // TODO: add a new task to the database
        const newTask = {
            username: username,
            taskId: uuidv4(),
            title: title,
            status: status,
            description: description,
            dueDate: dueDate, // time in millis
        };
        addUserTask(newTask, function (err, data) {
            console.log(data);
        });
    }

    const allStatus = [
        {
            value: "Not Started",
            label: "Not Started",
        },
        {
            value: "In Progress",
            label: "In Progress",
        },
        {
            value: "Finished",
            label: "Finished",
        },
    ];

    return (
        <>
            <Dialog open={props.open} onClose={() => props.handleClose()}>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        "& .MuiTypography-root": { textAlign: "center", m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography variant="h6" gutterBottom>
                        Add Task
                    </Typography>

                    <TextField required id="title" label="Title" variant="outlined" value={props.title} onChange={(e) => setTitle(e.target.value)} />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Controlled picker"
                            value={dueDate}
                            onChange={(date) => setDueDate(date)}
                        />
                    </LocalizationProvider>
                    <TextField
                        id="description"
                        label="Description"
                        type="description"
                        variant="outlined"
                        value={props.description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                    />
                    <TextField
                        id="standard-select-status"
                        select
                        label="Select"
                        defaultValue="Not Started"
                        helperText="Please select your status"
                        variant="outlined"
                        value={props.status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {allStatus.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box
                        sx={{
                            position: "flex",
                            bottom: "0",
                            right: "0",
                            p: 2, // add some padding
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

export default TaskModal;