import React, { useEffect, useState } from "react";
import {
  createUser,
  getUsers,
  deleteUser,
  updateUser
} from "../services/userServices";
import "../styles/AddUser.scss";

function AddUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateUser(editId, { email });
      setMessage("User updated successfully");
      setEditId(null);
    } else {
      await createUser({ email, password });
      setMessage("User added successfully");
    }

    setEmail("");
    setPassword("");
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEmail(user.email);
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div className="adduser-container">
  <div className="adduser-card">

    <div style={{ width: "600px", margin: "50px auto", textAlign: "center" }}>
      <h2>➕ Add User</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          required
          value={""}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        {!editId && (
          <>
            <br /><br />
            <input
              type="password"
              placeholder="Password"
              required
              value={""}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </>
        )}
        <br /><br />

        <button type="submit">
          {editId ? "Update User" : "Add User"}
        </button>
      </form>

      <p>{message}</p>

      <hr />

      <h3>👥 Users List</h3>

      <table border="1" width="100%" cellPadding="8">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>✏ Edit</button>
                &nbsp;
                <button onClick={() => handleDelete(user._id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
</div>

  );
}

export default AddUser;
