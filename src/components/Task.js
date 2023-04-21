import { useState } from "react";

import { Card, CardHeader, CardContent, CardActions, Typography, Tooltip, IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from "dayjs";

import TaskEditor from './TaskEditor';
import { deleteUserTask } from "../dynamodbClient";

function Task(props) {
    const [openEditor, setOpenEditor] = useState(false);

    const handleDelete = (username, taskId) => {
        deleteUserTask(username, taskId, function (err, data) {
            if (err) {
                alert("Error! Please try again later")
            } else {
                props.onDelete(taskId);
            }
        });
    }

    const handleEdit = (editTask) => {
        setOpenEditor(false);
        props.onEdit(editTask);
    }

    const handleClose = (e) => {
        setOpenEditor(false);
    };

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={props.title}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Description: {props.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Status: {props.taskStatus}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Due date: {dayjs.unix(props.dueDate).format('L')}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => setOpenEditor(true)} >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(props.username, props.taskId)}>
                            <DeleteForeverIcon />
                        </IconButton>

                    </Tooltip>
                </CardActions>
            </Card>
            <TaskEditor
                title={props.title}
                taskId={props.taskId}
                description={props.description}
                taskStatus={props.taskStatus}
                dueDate={props.dueDate}
                open={openEditor}
                handleClose={handleClose}
                actionType="edit"
                onSubmit={handleEdit}
            />
        </>
    )
}

export default Task;