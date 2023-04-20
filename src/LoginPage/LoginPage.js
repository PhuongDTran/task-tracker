import { useState } from "react";
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
      <h1>Login</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
