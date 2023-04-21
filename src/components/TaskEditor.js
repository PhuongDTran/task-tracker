import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { addUserTask, updateUserTask } from '../dynamodbClient';

const today = dayjs();

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

function TaskEditor(props) {
    const [username, setUsername] = useState(localStorage.getItem("user") || "");
    const [title, setTitle] = useState(props.title || "");
    const [description, setDescription] = useState(props.description || "");
    // default to be today
    const [dueDate, setDueDate] = useState(today);
    const [status, setStatus] = useState(props.taskStatus || allStatus[0].value);

    const handleSubmit = (e) => {
        const isValid = title.trim() && description.trim();
        if (!isValid) {
            alert ("Please enter valid values");
            return;
        }
        const {actionType, taskId} = props;
        // add/edit a task to the database
        const task = {
            username: username,
            taskId: actionType === "add" ? uuidv4() : taskId,
            title: title,
            taskStatus: status,
            description: description,
            dueDate: dueDate.unix(), // time in millis
        };
        if (actionType === "add") {
            addUserTask(task, function (err, data) {
                if (err) {
                    alert("Error! Please try again later")
                } else {
                    props.onSubmit(task)
                }
            });
            setTitle("");
            setDescription("");
            setDueDate(today);
            setStatus(allStatus[0].value);
        } else {
            updateUserTask(task, function (err, data) {
                if (err) {
                    alert("Error! Please try again later")
                } else {
                    props.onSubmit(task)
                }
            });
        }
    }

    function SimpleTitle(){
        if(props.title){
            return "Edit " + props.title
        } else {
            return "Add Task"
        }
    }


    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                    "& .MuiTypography-root": { textAlign: "center", m: 1 },
                }}
                noValidate
                autoComplete="off"
                className="TaskAddBox"
            >
                <Typography variant="h6" gutterBottom>
                    {SimpleTitle()}
                </Typography>

                <TextField required id="title" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value.trim())} />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Due Date"
                        value={dueDate}
                        minDate={today}
                        onChange={(date) => setDueDate(date)}
                    />
                </LocalizationProvider>
                <TextField
                    id="description"
                    label="Description"
                    required
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                />
                <TextField
                    id="standard-select-status"
                    select
                    label="Current Status"
                    defaultValue={status}
                    variant="outlined"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {allStatus.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{ m: 1 }}
                >
                    <Button
                        style={{ marginRight: "10px" }}
                        variant="contained"
                        color="error"
                        onClick={props.handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default TaskEditor;