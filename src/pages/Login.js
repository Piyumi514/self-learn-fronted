import React, { useState } from "react";
import axios from "axios";
import { loginVerify } from "../services/loginService";
import { useNavigate } from "react-router-dom";

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

    // Redirect to Add User page
    navigate("/add-user");
  } catch (err) {
    if (err.response && err.response.data) {
      setMessage(err.response.data.message);
    } else {
      setMessage("Login failed");
    }
  }
};

// ***************************
// const res = await axios.post("http://localhost:5000/api/auth/add-user", {
//         email,
//         password,
//       });
// ***************************
  return (
    <div style={{ width: "300px", margin: "100px auto", textAlign: "center" }}>
      <h2>🎁 Gift Box Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Login;
