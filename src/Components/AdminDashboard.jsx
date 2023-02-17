import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/reduxSlice";
// Admin Dashboard Component
function AdminDashboard() {
  const dispatch = useDispatch();
  let userData = JSON.parse(localStorage.getItem("users"));
  const [user, setUser] = useState(userData);
  // Delete User Handler
  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
    setUser(JSON.parse(localStorage.getItem("users")));
  };
  return (
    <div>
      <center>
        <h1>Admin Dashboard</h1>
        <div style={{ width: "70%" }}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {/* Display All Users */}
            <tbody>
              {user.map((val, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{val.username}</td>
                  <td>{val.email}</td>
                  <td>
                    <button
                      onClick={() => deleteHandler(val.id)}
                      type="button"
                      class="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </div>
  );
}

export default AdminDashboard;
