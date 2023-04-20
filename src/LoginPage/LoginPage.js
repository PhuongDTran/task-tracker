import React, { useState } from "react";
import { checkUserExists } from "../dynamodbClient";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import { getAllUserTasks } from "../dynamodbClient";

function LoginPage() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLogin = async () => {
    try {
      localStorage.setItem("user", username);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div id="loginForm">
      <h1>Login to Task Tracker</h1>
        <div className="centerFeild">
            <label className="LoginLabel">
              Username:
            </label>
            <input type="text" id="inputField" value={username} onChange={handleUsernameChange} />
            <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;