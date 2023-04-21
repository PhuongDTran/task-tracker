import { useState, useEffect } from "react";
import { getAllUserTasks } from "../dynamodbClient";
import "./DashboardPage.css";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Task from "../components/Task";
import TaskEditor from '../components/TaskEditor';

import { useNavigate } from "react-router-dom";


function DashboardPage() {
  const [username, setUsername] = useState(sessionStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (username == null) {
      navigate("/");
    } else {
      getAllUserTasks(username, function (err, data) {
        if (err) {
          alert("encounter an error. Please reload the page")
        } else {
          if (data && data.Items) {
            setTasks(data.Items);
          }
        }
      });
    }
  }, []);

  const handleAddTask = (newTask) => {
    // close task editor
    setOpen(false);

    // add new task to the tasks list
    const updatedTasks = [...tasks];
    updatedTasks.push(newTask);
    setTasks(updatedTasks);

  }

  const handleEditTask = editTask => {
    const updatedTasks = [...tasks];
    const found = updatedTasks.findIndex(task => task.taskId === editTask.taskId);
    updatedTasks[found] = editTask;
    setTasks(updatedTasks);
  }

  const handleDeleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.taskId !== taskId);
    setTasks(updatedTasks);
  }

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
        taskStatus={task.taskStatus}
        dueDate={task.dueDate}
        key={task.taskId}
        taskId={task.taskId}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
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
      <TaskEditor open={open} handleClose={handleClose} actionType="add" onSubmit={handleAddTask} />
    </div>
  );
}

export default DashboardPage;
