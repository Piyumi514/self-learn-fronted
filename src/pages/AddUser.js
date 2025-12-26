import React, { useEffect, useState } from "react";
import { createUser, getUsers } from "../services/userServices";

function AddUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await createUser({ email, password });
      setMessage(res.data.message);

      setEmail("");
      setPassword("");

      fetchUsers(); // refresh table
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding user");
    }
  };

  return (
    <div style={{ width: "500px", margin: "50px auto", textAlign: "center" }}>
      <h2>➕ Add User</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Add User</button>
      </form>

      <p>{message}</p>

      <hr />

      <h3>👥 Users List</h3>

      <table border="1" width="100%" cellPadding="8">
        <thead>
          <tr>
            <th>Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AddUser;
