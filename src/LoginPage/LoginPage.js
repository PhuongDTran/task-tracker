import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

function LoginPage() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const normalizedUserName = username.trim();
      if (normalizedUserName) {
        localStorage.setItem("user", normalizedUserName);
        navigate("/dashboard");
      } else {
        alert("Invalid name");
      }
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
            Your name:
          </label>
          <input type="text" id="inputField" value={username} onChange={handleUsernameChange} />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;