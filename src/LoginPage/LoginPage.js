import { useState } from "react";
import { checkUserExists } from "../dynamodbClient";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

function LoginPage() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const exists = await checkUserExists(username);
      if (exists) {
        setIsAuthenticated(true);
        localStorage.setItem("user", username);
        navigate("/dashboard");
      } else {
        // alert
        alert("Invalid username. Please try again.");
      }
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
