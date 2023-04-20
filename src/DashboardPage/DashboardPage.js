import { useState, useEffect } from "react";
import { getAllUserTasks, addUserTask } from "../dynamodbClient";
import "./DashboardPage.css";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Task from "../components/Task";
import TaskModal from '../components/TaskModal';
function DashboardPage() {
  const [username, setUsername] = useState(localStorage.getItem("user") || "");
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllUserTasks(username, function (err, data) {
      setTasks(data.Items);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <TaskModal open={open} handleClose={handleClose} />
    </div>
  );
}

export default DashboardPage;
