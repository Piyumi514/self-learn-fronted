import React, { useState } from "react";
import axios from "axios";
import { createUser } from "../services/userServices";

function AddUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
    //   const res = await axios.post(
    //     "http://localhost:5000/api/auth/register",
    //     { email, password }
    //   );
        const res = await createUser({ email, password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto", textAlign: "center" }}>
      <h2>➕ Add User</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Add User</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default AddUser;
