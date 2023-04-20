import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { deleteUserTask } from "../dynamodbClient";
import { useState } from "react";

function Task(props) {
    const [isDeleted, setIsDeleted] = useState(false);

    const handleClick = (username, taskId) => {
        deleteUserTask(username, taskId, function (err, data) {
            if (err) {
                console.log("err", err);
            } else {
                console.log("success", data);
            }
        });
        setIsDeleted(true);
    }

    return (
        <>
            {!isDeleted && <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Title:
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Description:
                            {props.description ? props.description : "No description"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Status:
                            {props.status ? props.status : "No status"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Duedate:
                            {props.due_date ? props.due_date : "No due date"}
                        </Typography>
                    </CardContent>
                    <button onClick={() => handleClick(props.username, props.id)}>delete</button>
                </CardActionArea>
            </Card>}
        </>
    )
}

export default Task;