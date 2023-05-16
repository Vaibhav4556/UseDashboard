import { useState } from "react";
import { Button, Table } from "reactstrap";
import { FaTrash, FaPen } from "react-icons/fa";
import "./UserDisplay.css";

function UserDisplay({
  users,
  onEdit,
  onSave,
  onDelete,
  onCancel,
  editedUser,
  onInputChange,
  editMode,
}) {
  const [visibleEntries, setVisibleEntries] = useState(3);
  const showMoreEntries = () => {
    setVisibleEntries((prevVisibleEntries) => prevVisibleEntries + 3);
  };

  const displayedUsers = users.slice(0, visibleEntries);

  return (
    <div>
      <h3>Users List</h3>
      <div className="container tableClass">
        <Table bordered>
          <thead className="">
            <tr>
              <th className="srNo">Sr.No.</th>
              <th className="firstname">First Name</th>
              <th className="email">Email</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {displayedUsers.map((user, index) => (
              <tr key={index + 1}>
                {editMode === index ? (
                  <>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        name="Firstname"
                        value={editedUser.Firstname}
                        onChange={onInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="email"
                        value={editedUser.email}
                        onChange={onInputChange}
                      />
                    </td>
                    <td>
                      <div className="editdelbtn">
                        <div className="editbtn">
                          <Button
                            color="primary"
                            onClick={() => {
                              onSave(index);
                              alert("User details have been saved.");
                            }}
                          >
                            Save
                            <FaPen />
                          </Button>
                        </div>
                        <div className="delbtn">
                          <Button color="danger" onClick={onCancel}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{index + 1}</td>
                    <td>{user.Firstname}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="editdelbtn">
                        <Button color="primary" onClick={() => onEdit(index)}>
                          <div className="editbtn">
                            Edit
                            <FaPen style={{ marginLeft: "8px" }} />
                          </div>
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => {
                            if (
                              window.confirm("Are you sure you want to delete?")
                            ) {
                              onDelete(index);
                            }
                          }}
                        >
                          <div className="delbtn">
                            Delete
                            <FaTrash style={{ marginLeft: "8px" }} />
                          </div>
                        </Button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        {visibleEntries < users.length && (
          <Button color="primary" onClick={showMoreEntries}>
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}

export default UserDisplay;
