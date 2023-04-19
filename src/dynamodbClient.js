import * as AWS from 'aws-sdk'

const configuration = {
  region: process.env.REACT_APP_REGION,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID
}

AWS.config.update(configuration)

const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const USER_TASKS_TABLE_NAME = 'team57-user-tasks';

export const addUserTask = (task, callback) => {
  const params = {
    TableName: USER_TASKS_TABLE_NAME,
    Item: task
  }

  docClient.put(params, function (err, data) {
    callback(err, data);
  })
}

export const updateUserTask = (task, callback) => {
  const { username, taskId, title, description, status, dueDate } = task;

  const params = {
    TableName: USER_TASKS_TABLE_NAME,
    Key: {
      username: username,
      taskId: taskId
    },
    UpdateExpression: 'set title = :title, description = :description, task_status = :status, due_date = :date',
    ExpressionAttributeValues: {
      ":title": title,
      ":description": description,
      ":status": status,
      ":date": dueDate
    }
  }

  docClient.update(params, function(err, data) {
    callback(err, data);
  })
}

export const deleteUserTask = (username, taskId, callback) => {
  const params = {
    TableName: USER_TASKS_TABLE_NAME,
    Key: {
      username: username,
      taskId: taskId
    }
  }

  docClient.delete(params, function(err, data) {
    callback(err, data);
  })
}

export const getAllUserTasks = (username, callback) => {
  const params = {
    TableName: USER_TASKS_TABLE_NAME,
    KeyConditionExpression: "username = :username",
    ExpressionAttributeValues: {
      ':username': username,
    }
  }
  return docClient.query(params, function (err, data) {
    callback(err, data);
  });
}

// Function to check if a user exists in DynamoDB
export const checkUserExists = async (tableName, username) => {
  const params = {
    TableName: tableName,
    Key: {
      username: username
    }
  };

  try {
    const data = await docClient.get(params).promise();
    if (data && data.Item) {
      return true; // User exists
    } else {
      return false; // User does not exist
    }
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
};
