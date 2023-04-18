import * as AWS from 'aws-sdk'

const configuration = {
  region: process.env.REACT_APP_REGION,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID
}

AWS.config.update(configuration)

const docClient = new AWS.DynamoDB.DocumentClient()

export const putData = (tableName , data) => {
  var params = {
      TableName: tableName,
      Item: data
  }

  docClient.put(params, function (err, data) {
      if (err) {
          console.log('Error', err)
      } else {
          console.log('Success', data)
      }
  })
}