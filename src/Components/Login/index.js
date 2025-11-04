import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../../Users.js";

export default function Login() {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = users.find((user) => user.username === creds.username);

    if (foundUser && foundUser.password === creds.password) {
      if (foundUser.isAdmin) {
        localStorage.setItem("isAdmin", "true");
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
        localStorage.setItem("isAdmin", "false");
        navigate("/blog");
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={creds.username}
          onChange={(e) => setCreds({ ...creds, username: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={creds.password}
          onChange={(e) => setCreds({ ...creds, password: e.target.value })}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
