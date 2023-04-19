import { useState, useEffect } from 'react';
import { getAllUserTasks } from '../dynamodbClient';
function DashboardPage() {

  const [username, setUsername] = useState(localStorage.getItem("user") || "");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getAllUserTasks(username, function (err, data) {
      setTasks(data.Items);
    });
  }, [])

  const taskElements = tasks.map(task => {
    return <div>
      <h2>Title: {task.title}</h2>
      <p>Description: {task.description}</p>
      <p>Status: {task.task_status}</p>
      <p>Due date: {task.due_date}</p>
    </div>
  })
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is a placeholder for the dashboard page.</p>
      {taskElements}
    </div>
  );
};

export default DashboardPage;