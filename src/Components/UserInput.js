import React, { useState } from "react";
import "./UserInput.css";
import UserDisplay from "./UserDisplay";

function UserInput() {
  const [data, setData] = useState("");

  const [user, setUser] = useState({
    email: "",
    Firstname: "",
  });

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ email: "", Firstname: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleClear = () => {
    setUser({
      email: "",
      Firstname: "",
    });
    setData("")
  };

  const handleLogin = () => {
    const { email, Firstname } = user;

    if (email && Firstname) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = [...existingUsers, user];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      
      setData("User details have been saved.");
    } else {
      setData("Please enter email and Firstname.");
    }
  };

  const handleEdit = (index) => {
    const userToEdit = users[index];
    setEditedUser({ ...userToEdit });
    setEditMode(index);
  };

  const handleSave = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index] = { ...editedUser };
    setUsers(updatedUsers);
    setEditMode(false);
    setEditedUser({ email: "", Firstname: "" });
    // Save the updated users to local storage or perform other operations
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    // Save the updated users to local storage or perform other operations
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedUser({ email: "", Firstname: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
   
    <div className="maindiv">
      <div className="datasavediv">
      <div
        className="shadow-lg p-3  bg-body rounded"
        style={{ width: "500px" }}
      >
        <h3>Enter User Details</h3>
        <div className="mb-3 row mt-4">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              value={user.email}
              onChange={handleSubmit}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="Firstname" className="col-sm-2 col-form-label">
            Firstname
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="Firstname"
              name="Firstname"
              value={user.Firstname}
              onChange={handleSubmit}
              />
            </div>
          </div>
          <div className="btnclear">
            <button
              onClick={handleLogin}
              type="button"
              className="btn btn-primary"
            >
              Submit
            </button>
            <button type="button" className="btn btn-primary" onClick={handleClear}>
              Clear
            </button>
          </div>
          <h5 className="saveddata" style={{ color: "red" }}>{data}</h5>
        </div>
        </div>
        <div className="userdisplaydiv">
        <div className="shadow-lg p-3  bg-body rounded">
          <UserDisplay
            users={users}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            onCancel={handleCancel}
            editedUser={editedUser}
            onInputChange={handleInputChange}
            editMode={editMode}
          />
        </div>
        </div>
      </div>
    
    );
  }
  
  export default UserInput;
 