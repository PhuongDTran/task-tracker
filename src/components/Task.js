import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { deleteUserTask } from "../dynamodbClient";
import { useState } from "react";
import TaskModal from './TaskModal';
function Task(props) {
    const [isDeleted, setIsDeleted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

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
    
    const handleClose = () => {
        setModalOpen(false);
        console.log(modalOpen);
      };

    return (
        <>
            {!isDeleted && <Card sx={{ maxWidth: 345 }} onClick={() => setModalOpen(true)}>
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
                {modalOpen && <TaskModal
                title={props.title}
                description={props.description}
                status={props.status}
                due_date={props.due_date} 
                open={modalOpen} 
                handleClose={handleClose}/>}
            </Card>}
        </>
    )
}

export default Task;