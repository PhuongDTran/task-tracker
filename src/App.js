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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
