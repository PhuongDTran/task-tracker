import { useState, useEffect } from 'react';
import { getAllUserTasks } from '../dynamodbClient';
import './DashboardPage.css';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
function DashboardPage() {

  const [username, setUsername] = useState(localStorage.getItem("user") || "");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getAllUserTasks(username, function (err, data) {
      setTasks(data.Items);
    });
  }, [])

  const taskElements = tasks.map(task => {
    return <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Title:
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description:
            {task.description ? task.description : "No description"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status:
            {task.status ? task.status : "No status"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duedate:
            {task.due_date ? task.due_date : "No due date"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  })

  return (
    <div>
      <h1>Dashboard</h1>
      {tasks.length === 0 ? (
        <p>You have not set up any tasks yet.</p>
      ) : (
        <div className="card-container">{taskElements}</div>
      )}
    </div>
  );
};

export default DashboardPage;