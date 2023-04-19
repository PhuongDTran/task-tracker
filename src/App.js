import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import {
  addUserTask,
  getAllUserTasks,
  updateUserTask,
  deleteUserTask,
} from "./dynamodbClient";
import DashboardPage from "./DashboardPage/DashboardPage";
import LoginPage from "./LoginPage/LoginPage";



function App() {
  
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    // add a task
    const newTask = {
      username: "phuong",
      taskId: uuidv4(),
      title: "test",
      status: "done",
      description: "test",
      dueDate: 1681861699375, // time in millis
    };
    addUserTask(newTask, function (err, data) {
      console.log(data);
    });

    // get all tasks belong to a username
    getAllUserTasks("phuong", function (err, data) {
      console.log(data);
    });

    //update a task
    const task = {
      username: "phuong",
      taskId: "170",
      title: "test",
      status: "done",
      description: "test",
      dueDate: 56789834838, // mockup
    };
    updateUserTask(task, function (err, data) {
      if (err) {
        console.log("err", err);
      } else {
        console.log("success", data);
      }
    });

    // delete a task given username and taskId
    deleteUserTask("Faisal", "170", function (err, data) {
      if (err) {
        console.log("err", err);
      } else {
        console.log("success", data);
      }
    });
  }, []);

  return (
    <>
      <div className="App">
        <LoginPage />
      </div>
      <Router>
        <Routes>
          <Route exact path="/" component={LoginPage} />
          {/* <Route path="/dashboard" component={DashboardPage} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
