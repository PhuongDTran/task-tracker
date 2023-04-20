import { useState, useEffect } from "react";
import { getAllUserTasks, addUserTask } from "../dynamodbClient";
import { v4 as uuidv4 } from "uuid";
import "./DashboardPage.css";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import Task from "../components/Task";

function DashboardPage() {
  const [username, setUsername] = useState(localStorage.getItem("user") || "");
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  // states for the new task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // default to be today
  const [dueDate, setDueDate] = useState(dayjs());
  const [status, setStatus] = useState("");

  useEffect(() => {
    getAllUserTasks(username, function (err, data) {
      setTasks(data.Items);
    });
  }, []);

  const taskElements = tasks.map((task) => {
    return (
      <Task
        username={username}
        title={task.title}
        description={task.description}
        status={task.status}
        due_date={task.due_date}
        key={task.taskId}
        id={task.taskId}
      >
      </Task>
    );
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  function handleSubmit(e) {
    // TODO: add a new task to the database
    e.preventDefault();
    const newTask = {
      username: username,
      taskId: uuidv4(),
      title: title,
      status: status,
      description: description,
      dueDate: dueDate, // time in millis
    };
    console.log(newTask);
    addUserTask(newTask, function (err, data) {
      console.log(data);
    });
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {tasks.length === 0 ? (
        <p>You have not set up any tasks yet.</p>
      ) : (
        <div className="card-container">{taskElements}</div>
      )}
      <div className="add-task-button">
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </div>
      <Dialog open={open} onClose={handleClose}>
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

          <TextField required id="title" label="Title" variant="outlined" onChange={(e) => setTitle(e.target.value)}/>
          
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
    </div>
  );
}

export default DashboardPage;
