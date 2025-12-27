import React, { useState } from "react";
import { loginVerify } from "../services/loginService";
import { useNavigate } from "react-router-dom";
import "../styles/Login.scss"; // 👈 Import SCSS

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginVerify(email, password);
      localStorage.setItem("token", res.data.token);
      setMessage("Login Successful 🎁");
      navigate("/add-user");
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Login failed");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🎁 Gift Box Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
