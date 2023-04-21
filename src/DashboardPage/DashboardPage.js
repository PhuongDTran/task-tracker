import { useState, useEffect } from "react";
import { getAllUserTasks } from "../dynamodbClient";
import "./DashboardPage.css";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Task from "../components/Task";
import TaskEditor from '../components/TaskEditor';

import { useNavigate } from "react-router-dom";


function DashboardPage() {
  const [username, setUsername] = useState(localStorage.getItem("user"));
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

  function handleSortSelecter(Picked) {
    localStorage.setItem("Picked", Picked);
    document.location.reload();
  }

  function StartingAssignment() {
    let checkedBox
    let item = localStorage.getItem("Picked")

    setTimeout(() => {
      if (item) {
        checkedBox = document.getElementById(item);
        checkedBox.checked = true;
      } else {
        localStorage.setItem("Picked","title");
        checkedBox = document.getElementById("title");
        checkedBox.checked = true;
      }
    }, 50)
  }

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

  function SortCards(CardOrder) {
    return function (a, b) {

      if (!a) {
        return 1;
      }
      if (!b) {
        return -1;
      }

      if ((a[CardOrder] + "0").toString().toLowerCase() > (b[CardOrder] + "0").toString().toLowerCase()) {
        return 1;
      } else if ((a[CardOrder] + "0").toString().toLowerCase() < (b[CardOrder] + "0").toString().toLowerCase()) {
        return -1;
      } else {
        return 0
      }
    }
  }

  const taskElements = tasks.sort(SortCards(localStorage.getItem("Picked")) || "Title").map((task) => {
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
        className="CardClass"
      >
      </Task>
    );
  });


  return (
    <div>
      <div class="topnav">
        <a class="active" href="#index">Task Tracker</a>
        <a class="inactive" href="/" onClick={(()=>{
          localStorage.clear();
        })}>Sign Out</a>
        <div class="topnav-right">  
          <a class="name">{"Username: " + localStorage.getItem('user') || "How did you get here?"}</a>
        </div>
      </div>
      <h1 class="Dashboard">Dashboard</h1>
      <div className="radios">
        <input type="radio" id="title" name="fav_language" value="Title" onClick={() => handleSortSelecter("title")}></input>
        <label for="html">Title</label>
        <input type="radio" id="taskStatus" name="fav_language" value="Status" onClick={() => handleSortSelecter("taskStatus")}></input>
        <label for="css">Status</label>
        <input type="radio" id="dueDate" name="fav_language" value="Duedate" onClick={() => handleSortSelecter("dueDate")}></input>
        <label for="javascript">Duedate</label>
        {StartingAssignment()}
      </div>
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
