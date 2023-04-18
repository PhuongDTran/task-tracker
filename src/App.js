import * as React from 'react';
import logo from './logo.svg';
import './App.css';

import {putData} from './dynamodbClient'

const USER_TASKS_TABLE_NAME = 'team57-user-tasks'

function App() {

  React.useEffect(() => {
    async function addData() {
    const userData = {
      username: "phuong",
      taskId: "170"
    }

    await putData(USER_TASKS_TABLE_NAME , userData)
  };
  addData();
  }, [])

  return (
    <div className="App">
      <p>team 57</p>
    </div>
  );
}

export default App;
